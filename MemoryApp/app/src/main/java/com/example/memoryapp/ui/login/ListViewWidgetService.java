package com.example.memoryapp.ui.login;

import android.appwidget.AppWidgetManager;
import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.RemoteViews;
import android.widget.RemoteViewsService;

import com.example.memoryapp.R;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

public class ListViewWidgetService extends RemoteViewsService {
    public static final String SCORE_DATA = "data";

    @Override
    public RemoteViewsFactory onGetViewFactory(Intent intent) {
        return new ListViewRemoteViewsFactory(this.getApplicationContext(), intent);
    }

    private class ListViewRemoteViewsFactory implements RemoteViewsService.RemoteViewsFactory {


        private int mCount = 0;
        private List<String> mWidgetItems = new ArrayList<>();
        private Context mContext;


        public ListViewRemoteViewsFactory(Context context, Intent intent) {
            mContext = context;

            String data = intent.getStringExtra(SCORE_DATA);

            try {
                JSONArray resultObject = new JSONArray(data);
                for(int i = 0; i<resultObject.length(); i++){
                    JSONObject jsonObject = resultObject.getJSONObject(i);
                    String firstName = jsonObject.getJSONObject("user").getString("firstname");
                    String lastName = jsonObject.getJSONObject("user").getString("lastname");
                    String score = jsonObject.getString("score");
                    String game = jsonObject.getJSONObject("game").getString("gameName");
                    StringBuilder totalString = new StringBuilder();
                    totalString.append("Name: " + firstName + " " + lastName + " " + "Score: " + score + " Game: " + game );
//                        totalString.append("Score: " + score + " ");
//                        totalString.append("Game: " + game + " ");
                    mWidgetItems.add(totalString.toString());

                }
                mCount = mWidgetItems.size();
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        public void onCreate() {

        }

        @Override
        public void onDataSetChanged() {

        }

        public void onDestroy() {

            mWidgetItems.clear();
        }
        public int getCount() {
            return mCount;
        }

        public RemoteViews getViewAt(int position) {

            RemoteViews rv = new RemoteViews(mContext.getPackageName(), R.layout.list_item);
            rv.setTextViewText(R.id.list_item, mWidgetItems.get(position));
            Intent fillInIntent = new Intent();
            rv.setOnClickFillInIntent(R.id.list_item, fillInIntent);

            return rv;
        }
        public RemoteViews getLoadingView() {
            return null;
        }
        public int getViewTypeCount() {
            return 1;
        }
        public long getItemId(int position) {
            return position;
        }
        public boolean hasStableIds() {
            return true;
        }
    }
}
