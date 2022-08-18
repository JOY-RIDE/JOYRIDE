package com.joyride.ms.src.course;

import com.joyride.ms.src.course.model.CourseInfo;
import com.joyride.ms.src.course.model.GetCourseListRes;
import com.joyride.ms.util.BaseException;
import com.joyride.ms.util.SecretKey;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import static com.joyride.ms.util.BaseResponseStatus.DATABASE_ERROR;

@Service
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class CourseService {

    private final CourseDao courseDao;
    private final CourseProvider courseProvider;

    public List<GetCourseListRes> createCourseList() throws BaseException {
        try {
            int check = courseDao.existsCourse("고락산 둘레길");

            // 만약 db에 정보가 없다면
            if (check == 0) {
                String result = "";

                URL url = new URL("https://api.visitkorea.or.kr/openapi/service/rest/Durunubi/" +
                        "courseList?MobileOS=ETC&MobileApp=joyride&ServiceKey=" + SecretKey.API_SECRET_KEY +
                        "&brdDiv=DNBW&numOfRows=3004&pageNo=1&_type=json");

                BufferedReader bf;
                bf = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
                result = bf.readLine();

                JSONParser jsonParser = new JSONParser();
                JSONObject jsonObject = (JSONObject) jsonParser.parse(result);
                JSONObject response = (JSONObject) jsonObject.get("response");
                JSONObject body = (JSONObject) response.get("body");
                JSONObject items = (JSONObject) body.get("items");

                JSONArray courseArr = (JSONArray) items.get("item");

                for (int i = 0; i < courseArr.size(); i++) {
                    JSONObject course = (JSONObject)courseArr.get(i);
                    //중복 제거 및, 자전거 길만 저장
                    ArrayList<String> courseIdList = new ArrayList<String>();
                    if (courseIdList.contains((String)course.get("crsIdx"))) {
                        continue;
                    } else {
                        courseIdList.add((String) course.get("crsIdx"));
                    }

                    String checkBrdDiv = (String)course.get("brdDiv");
                    if (checkBrdDiv.equals("DNWW")) {
                        continue;
                    }

                    String crsKorNm = (String)course.get("crsKorNm");
                    String crsContents = (String)course.get("crsContents");
                    String crsSummary = (String)course.get("crsSummary");
                    String crsTourInfo = (String)course.get("crsTourInfo");
                    String travelerinfo = (String)course.get("travelerinfo");
                    String crsDstncStr = (String)course.get("crsDstnc");
                    double crsDstnc = Double.parseDouble(crsDstncStr);
                    String crsLevelStr = (String)course.get("crsLevel");
                    int crsLevel = Integer.parseInt(crsLevelStr);
                    String sigun = (String)course.get("sigun");
                    String crsTotlRqrmHourStr = (String)course.get("crsTotlRqrmHour");
                    double crsTotlRqrmHour = Double.parseDouble(crsTotlRqrmHourStr);
                    String brdDiv = (String)course.get("brdDiv");

                    CourseInfo courseInfo = CourseInfo.createCourseInfo(crsKorNm, crsContents, crsSummary, crsTourInfo,
                            travelerinfo, crsDstnc, crsLevel, sigun, crsTotlRqrmHour, brdDiv);

                    courseDao.insertCourse(courseInfo);

                }
                List<GetCourseListRes> getCourseListRes = courseProvider.retrieveCourseList();
                return getCourseListRes;
            }
            else {
                List<GetCourseListRes> getCourseListRes = courseProvider.retrieveCourseList();
                return getCourseListRes;
            }
        }
        catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }
}