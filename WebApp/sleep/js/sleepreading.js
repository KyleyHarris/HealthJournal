diabeticHealthTracker.SleepReadings = { 
data:{
    GetRecentData: function(callback){
        var qry = diabeticHealthTracker.newQuery();
        this.GetRecentView(qry);
        qry.Run(callback,
            diabeticHealthTracker.SleepReadings.data.onMessageFailed);
    }
    ,addReading:function(amount){
        // Send a message to the server that we just had a drink.
        var qry = diabeticHealthTracker.newQuery();
        qry.insert("Sleep", ["Hours"],
        {"Hours":amount});
        this.GetRecentView(qry);
        qry.Run(diabeticHealthTracker.SleepReadings.data.onPageDataCallback,
                diabeticHealthTracker.SleepReadings.data.onMessageFailed);
    }
    ,onPageDataCallback:null // assign this callback function when the server returns data to display
    ,onMessageFailed:null // assign this callback function when the server returns data to display
    ,GetRecentView:function(aQuery){
        var dt = new Date();
        dt.setMonth(dt.getMonth()-3);
        // all local dates must be converted to sqlDate strings (which converts them to UTC time)
        aQuery.select("RecentReadings",
        {
            "sql": "select top 50 Hours, TimeTaken \nfrom Sleep \nwhere \n _userid = @_userid order by TimeTaken desc",
            "token": "cAa0FR1Iu5stmo5sTQlMhd5kNDe18PMMP6L7fEw7dJ8COAppCi5txYYIrDGKbmcWR8Ro/9mH7PXl/4mSzBorOAV4fPwrnMor1YoZhFZ8qTs="
        }
        ,
          {});
        
    }
}


}