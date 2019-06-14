package com.example.memoryapp.data;

import android.os.AsyncTask;

import com.auth0.android.jwt.JWT;
import com.example.memoryapp.data.model.LoggedInUser;

import org.json.JSONObject;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Class that handles authentication w/ login credentials and retrieves user information.
 */
public class LoginDataSource {

    public Result<LoggedInUser> login(String username, String password) {

        try {
            // TODO: handle loggedInUser authentication


            String result = new LogInTask().execute(username, password).get();

            JSONObject resultObject = new JSONObject(result);

            String id = resultObject.getString("id");
            String name = resultObject.getString("firstname") + " " + resultObject.getString("lastname");
            String token = resultObject.getString("token");

            LoggedInUser user = new LoggedInUser(id, name, token);

            return new Result.Success<>(user);
        } catch (Exception e) {
            return new Result.Error(new IOException("Error logging in", e));
        }
    }

    public void logout() {
        // TODO: revoke authentication
    }

    private  class LogInTask extends AsyncTask<String, Integer, String> {
        protected String doInBackground(String... credentials) {
            HttpURLConnection urlConnection = null;
            String result = "";

            try {
                URL url = new URL("http", "192.168.2.12", 5304, "login");

                urlConnection = (HttpURLConnection) url.openConnection();

                urlConnection.setDoOutput(true);
                urlConnection.setRequestMethod("POST");
                urlConnection.setRequestProperty("Content-Type", "application/json");

                String postData = "{ 'Username': '" + credentials[0]
                        + "', 'Password': '" + credentials[1] + "'}";

                try {
                    DataOutputStream wr = new DataOutputStream( urlConnection.getOutputStream());
                    wr.write(postData.getBytes());
                } catch(IOException ex) {

                }

                int status = urlConnection.getResponseCode();
                InputStreamReader in;
                if(status < 400) {

                    in = new InputStreamReader(urlConnection.getInputStream());
                } else{
                    in = new InputStreamReader(urlConnection.getErrorStream());
                }

                StringBuilder strBuilder = new StringBuilder();
                int data = in.read();
                while(data != -1){
                    strBuilder.append((char) data);
                    data = in.read();
                }
                result = strBuilder.toString();

                System.out.println(result + url.toString());
            } catch (IOException ex) {
                ex.printStackTrace();
            } finally {
                if (urlConnection != null) {
                    urlConnection.disconnect();
                }
            }
            return result;
        }

        protected void onProgressUpdate(Integer... progress) {}

        protected void onPostExecute(String result) {}
    }
}
