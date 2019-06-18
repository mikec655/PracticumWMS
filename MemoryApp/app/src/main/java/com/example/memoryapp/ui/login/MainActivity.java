package com.example.memoryapp.ui.login;

import android.app.Activity;
import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.AsyncTask;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.memoryapp.R;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class MainActivity extends Activity {

    static final int REQUEST_IMAGE_CAPTURE = 1;
    public String data;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        new RequestTask().execute("");
    }

    public void updateWidget() {
        Context context = getApplicationContext();
        Intent intent = new Intent(context, Widget.class);
        intent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
        intent.putExtra(ListViewWidgetService.SCORE_DATA, data);
        int[] ids = AppWidgetManager.getInstance(context).getAppWidgetIds(new ComponentName(context, Widget.class));
        if (ids != null && ids.length > 0) {
            intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids);
            context.sendBroadcast(intent);
        }
    }

    public void dispatchTakePictureIntent(View view) {
        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        if (takePictureIntent.resolveActivity(getPackageManager()) != null) {
            startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == RESULT_OK) {
            Bundle extras = data.getExtras();
            Bitmap imageBitmap = (Bitmap) extras.get("data");
            ImageView imageView = findViewById(R.id.imageView);
            imageView.setImageBitmap(imageBitmap);
        }
    }

    private void setData(String data) {
        TextView textView = findViewById(R.id.textView);
        textView.setText(data);
        this.data = data;
        updateWidget();
    }

    private class RequestTask extends AsyncTask<String, Integer, String> {
        protected String doInBackground(String... requests) {
            HttpURLConnection urlConnection = null;
            String result = "";

            try {
                URL url = new URL("http", "192.168.178.227", 5304, "myscores");

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
            setData(result);
        }
    }
}
