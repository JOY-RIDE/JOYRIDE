package com.joyride.ms.src.course;

import com.joyride.ms.src.course.model.CourseInfo;
import com.joyride.ms.src.course.model.GetCourseListRes;
import com.joyride.ms.util.BaseException;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import static com.joyride.ms.util.BaseResponseStatus.DATABASE_ERROR;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseDao courseDao;
    private final CourseProvider courseProvider;

    public List<GetCourseListRes> getCourseList() throws BaseException {
        try {
            int check = courseDao.checkCourse("정읍 정읍천 자전거길");

            // 만약 db에 정보가 없다면
            if (check == 0) {
                System.out.println("api 호출");
                String result = "";
                // 실제 서비스 할때는 자전거 정보 뒤에 &numOfRows=3004 붙여줘야 함
                URL url = new URL("https://api.visitkorea.or.kr/openapi/service/rest/Durunubi/" +
                        "courseList?MobileOS=ETC&MobileApp=joyride&ServiceKey=JuZZRYW0TJ1Rh%2FEUVtpmO08L826y%2BRKT1t2aGVHq3RZa8Bh3GpM%2BsQENuVD3zMGUQP47PZCUCI0OV67gOtky%2Bw%3D%3D" +
                        "&brdDiv=DNBW&pageNo=1&_type=json");

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
                    //중복 제거 및, 자전거 길만 저장 하도록(일단은 주석 처리)
//                    ArrayList<String> courseIdList = new ArrayList<String>();
//                    if (courseIdList.contains((String)course.get("crsIdx"))) {
//                        // 아이디를 포함하고 있으면 넘기기;
//                        continue;
//                    } else {
//                        courseIdList.add((String) course.get("crsIdx"));
//                    }
//                    //걷기 길 패스
//                    if ((String)course.get("brdDiv") == "DNWW") {
//                        continue;
//                    }

                    String crsKorNm = (String)course.get("crsKorNm");
                    String crsContents = (String)course.get("crsContents");
                    String crsSummary = (String)course.get("crsSummary");
                    String crsTourInfo = (String)course.get("crsTourInfo");
                    String crsDstncStr = (String)course.get("crsDstnc");
                    double crsDstnc = Double.parseDouble(crsDstncStr);
                    String crsLevelStr = (String)course.get("crsLevel");
                    int crsLevel = Integer.parseInt(crsLevelStr);
                    String sigun = (String)course.get("sigun");
                    String crsTotlRqrmHour = (String)course.get("crsTotlRqrmHour");
                    //int id = i + 1;

                    CourseInfo courseInfo = CourseInfo.createCourseInfo(crsKorNm, crsContents, crsSummary, crsTourInfo,
                            crsDstnc, crsLevel, sigun, crsTotlRqrmHour);

                    //Dao save 코드
                    courseDao.createCourseList(courseInfo);

                }
                List<GetCourseListRes> getCourseListRes = courseProvider.getCourseList();
                return getCourseListRes;
            }
            else {
                List<GetCourseListRes> getCourseListRes = courseProvider.getCourseList();
                return getCourseListRes;
            }
        }
        catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }
}
