package com.joyride.ms.src.course;

import com.joyride.ms.util.BaseException;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLEncoder;

import static com.joyride.ms.util.BaseResponseStatus.DATABASE_ERROR;

@Component
public class CallApi {

    @Value("${durunubi.secret}")
    private String API_SECRET_KEY;

    private String a = "";
    private String b = null;
    private String c = " ";

    // courseArr를 리턴해주는 method
    // 이거 api키가 제대로 못받아오네
    public JSONArray callCourseAPI() throws Exception {
        try {
            String result = "";

            URL url = new URL("https://api.visitkorea.or.kr/openapi/service/rest/Durunubi/" +
                    "courseList?MobileOS=ETC&MobileApp=joyride&ServiceKey=" + API_SECRET_KEY +
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
            return courseArr;
        }
        catch (Exception exception) {
            exception.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }

    // 디테일 조회시 api 호출(String title을 파라미터로 받는)
    public JSONArray callCourseAPI(String title) throws Exception {
        try {
            String result = "";

            StringBuilder urlBuilder = new StringBuilder("https://api.visitkorea.or.kr/openapi/service/rest/Durunubi/courseList"); /*URL*/
            urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=" + API_SECRET_KEY); /*Service Key*/

            urlBuilder.append("&" + URLEncoder.encode("MobileOS","UTF-8") + "=" + URLEncoder.encode("ETC", "UTF-8")); /*IOS (아이폰), AND (안드로이드), WIN (윈도우폰), ETC*/
            urlBuilder.append("&" + URLEncoder.encode("MobileApp","UTF-8") + "=" + URLEncoder.encode("joyride", "UTF-8")); /*서비스명=어플명*/
            urlBuilder.append("&" + URLEncoder.encode("crsKorNm","UTF-8") + "=" + URLEncoder.encode(title, "UTF-8")); /*검색하고자 하는 코스명 (인코딩 필요)*/
            urlBuilder.append("&" + URLEncoder.encode("_type","UTF-8") + "=" + URLEncoder.encode("json", "UTF-8"));
            URL url = new URL(urlBuilder.toString());
            BufferedReader bf;
            bf = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
            result = bf.readLine();

            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObject = (JSONObject) jsonParser.parse(result);
            JSONObject response = (JSONObject) jsonObject.get("response");
            JSONObject body = (JSONObject) response.get("body");
            JSONObject items = (JSONObject) body.get("items");
            JSONArray courseArr = (JSONArray) items.get("item");
            return courseArr;
        }
        catch (Exception exception) {
            exception.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }


}
