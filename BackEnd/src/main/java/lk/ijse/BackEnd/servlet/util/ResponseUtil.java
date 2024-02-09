package lk.ijse.BackEnd.servlet.util;


import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObjectBuilder;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class ResponseUtil {
    public static void genJson(String msg, int status, HttpServletResponse resp) {

        JsonObjectBuilder jsonObjectBuilder = Json.createObjectBuilder();
        jsonObjectBuilder.add("status", status);
        jsonObjectBuilder.add("message", msg);
        resp.setStatus(HttpServletResponse.SC_OK);
        try {
            PrintWriter writer = resp.getWriter();
            writer.print(jsonObjectBuilder.build());
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }

    }

    public static void genJson(String msg, int status, HttpServletResponse resp, JsonArrayBuilder arrayBuilder) {

        JsonObjectBuilder jsonObjectBuilder = Json.createObjectBuilder();
        jsonObjectBuilder.add("status", status);
        jsonObjectBuilder.add("message", msg);
        resp.setStatus(HttpServletResponse.SC_OK);
        try {
            PrintWriter writer = resp.getWriter();
            writer.print(arrayBuilder.build());
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }

    }

    public static void genJson(String msg, int status, Exception e, HttpServletResponse resp) {

        JsonObjectBuilder jsonObjectBuilder = Json.createObjectBuilder();
        jsonObjectBuilder.add("status", status);
        jsonObjectBuilder.add("message", msg);
        jsonObjectBuilder.add("data", e.getLocalizedMessage());
        resp.setStatus(HttpServletResponse.SC_OK);
        try {
            PrintWriter writer = resp.getWriter();
            writer.print(jsonObjectBuilder.build());
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }

    }


}
