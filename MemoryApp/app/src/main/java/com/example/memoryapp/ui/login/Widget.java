package com.example.memoryapp.ui.login;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.widget.RemoteViews;


import com.example.memoryapp.R;

public class Widget extends AppWidgetProvider {

    public String data = "";

    @Override
    public void onReceive(Context context, Intent intent) {
        if(intent.getStringExtra(ListViewWidgetService.SCORE_DATA) != null) {
            data = intent.getStringExtra(ListViewWidgetService.SCORE_DATA);
        }
        super.onReceive(context, intent);
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        final int N = appWidgetIds.length;

        // Perform this loop procedure for each App Widget that belongs to this provider
        for (int i=0; i<N; i++) {
            int appWidgetId = appWidgetIds[i];

            // Create an Intent to launch ExampleActivity
            Intent intent = new Intent(context, ListViewWidgetService.class);
            intent.putExtra(ListViewWidgetService.SCORE_DATA, data);

            // Get the layout for the App Widget and attach an on-click listener
            // to the button
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.activity_widget);
            views.setRemoteAdapter(appWidgetId, R.id.listView, intent);

            // Tell the AppWidgetManager to perform an update on the current app widget
            appWidgetManager.notifyAppWidgetViewDataChanged(appWidgetId, R.id.listView);
            appWidgetManager.updateAppWidget(appWidgetId, views);
        }
    }
}

