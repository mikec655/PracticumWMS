package com.example.memoryapp.ui.login;

import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

import com.example.memoryapp.R;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        new RequestTask().execute("");

    }

    private void setText(String text) {
        TextView textView = findViewById(R.id.textView);
        textView.setText(text);
    }

    private class RequestTask extends AsyncTask<String, Integer, String> {
        protected String doInBackground(String... requests) {
            HttpURLConnection urlConnection = null;
            String result = "";

            try {
                URL url = new URL("http", "192.168.2.12", 5304, "myscores");

                urlConnection = (HttpURLConnection) url.openConnection();

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

        protected void onPostExecute(String result) {
            setText(result);
        }
    }
}
