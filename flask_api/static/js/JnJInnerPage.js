$(document).ready(function() {

       //Get current month date
       var d = new Date();

              var currentMonth =(d.getMonth() < 9 ? '0': '') + (d.getMonth()+1);
              var currentMonthyuear =  currentMonth +"/" +d.getFullYear()
              $('#MonthYear').val(currentMonthyuear)

       var currentdate = d.toLocaleDateString("en-IN");
       //Assign value to end date
       $('#end_date').val(currentdate)

       var newdate = new Date(d);
       newdate.setDate(newdate.getDate() - 30); // minus the date
       var nd = new Date(newdate);
       var enddate = nd.toLocaleDateString("en-IN");
       //Assign value to end date
       $('#start_date').val(enddate)

       $('#search').click(function(e) {
         var apiUrl = $('#APIUrl').val();
         var groupName = $('#groupName').val();

         BuildChart(apiUrl,groupName);

       });
       $('#MonthYearsearch').click(function(e) {
         var apiUrl = $('#APIUrl').val();
         var groupName = $('#groupName').val();

         BuildChart(apiUrl,groupName);

       });

       $('#btnVibe').click(function(e) {

          var apiUrl = "/report9_vibe"
          var groupName = "JnJVibe"
         BuildChart(apiUrl,groupName);
       });
       $('#btnSelectplus').click(function(e) {
          var apiUrl = "/report11_select_plus"
          var groupName = "JnJSelectPlus"
         BuildChart(apiUrl,groupName);
       });
       $('#btnVerio').click(function(e) {
          var apiUrl = "/report10_verio"
          var groupName = "JnJVerio"
         BuildChart(apiUrl,groupName);
       });
       $('#btnLegacy').click(function(e) {
          var apiUrl = "/report12_legacy"
          var groupName = "JnJLegacy"
         BuildChart(apiUrl,groupName);
       });

      //  Report 32 To 37
      $('#btnlessone').click(function(e) {

         var apiUrl = "/report32_avg_testing_freq"
         var groupName = "JnJlessone"
        BuildChart(apiUrl,groupName);
      });
      $('#btnoneToTwo').click(function(e) {
         var apiUrl = "/report33_avg_testing_freq"
         var groupName = "JnJoneToTwo"
        BuildChart(apiUrl,groupName);
      });
      $('#btntwotothree').click(function(e) {
         var apiUrl = "/report34_avg_testing_freq"
         var groupName = "JnJtwotothree"
        BuildChart(apiUrl,groupName);
      });
      $('#btnthreetofour').click(function(e) {
         var apiUrl = "/report35_avg_testing_freq"
         var groupName = "JnJthreetofour"
        BuildChart(apiUrl,groupName);
      });
      $('#btnfourtofive').click(function(e) {
         var apiUrl = "/report36_avg_testing_freq"
         var groupName = "JnJfourtofive"
        BuildChart(apiUrl,groupName);
      });
      $('#btngreaterfive').click(function(e) {
         var apiUrl = "/report37_avg_testing_freq"
         var groupName = "JnJgreaterfive"
        BuildChart(apiUrl,groupName);
      });

       var apiUrl = $('#APIUrl').val();
       var groupName = $('#groupName').val();

       BuildChart(apiUrl,groupName);

});

function BuildChart(apiUrl,groupName){
var lblxAxis = $('#lblxAxis').val();
var lblyAxis = $('#lblyAxis').val();

 $.ajax({
     url: apiUrl,
     data: $('form').serialize(),
     type: 'POST',
     success: function(response) {
         var JnJData =  [];
         if(response.length > 0)
         {
           if(groupName == "JnJMobileActive")
           {
             JnJData = processData(response);
           }
           else if(groupName == "JnJWebMobile" || groupName == "JnJCommulativeBg" || groupName == "JnJManualBg" || groupName == "JnJFoodLog" || groupName == "JnJCumuManualBg" || groupName == "JnJBg"
                  || groupName == "JnJTotalClinic" || groupName == "JnJHCPS" || groupName == "JnJAvgBg")
           {
              JnJData = WebMobileUserCountMonth(response);
           }
           else if(groupName == "JnJSelectPlus" || groupName == "JnJVibe" || groupName == "JnJVerio" || groupName == "JnJLegacy")
           {
                 JnJData = TransmissionDevice(response);
           }
          else if(groupName == "JnJHypose" || groupName == "JnJHyper" || groupName == "JnJseverLow" || groupName == "JnJseverHigh")
          {
            JnJData = PatientCount(response);
          }
          else if (groupName == "JnJHCPAssets" || groupName == "JnJHCPActive")
          {
               JnJData = HCPCount(response);
          }
          else if (groupName == "JnJAvgTest")
          {
               JnJData = Avg_test_freq(response);
          }
          else if (groupName == "JnJPatientDevice" || groupName == "JnJPatientDeviceThisMonth" )
          {
               JnJData = Total_patients_device(response);
          }
         else if (groupName == "JnJPatientCreate" || groupName == "JnJTotalPatient")
         {
              JnJData = Total_patients(response);
         }
         else if (groupName == "JnJKaiser" || groupName == "JnJWalgreen")
         {
              JnJData = linechart(response);
         }
         else if (groupName == "JnJpatientclinic")
         {
              JnJData = Patients_clinics(response);
         }
         else if (groupName == "JnJBLE")
         {
              JnJData = Users_ble(response);
         }
         else if (groupName == "JnJpatientopted")
         {
              JnJData = Patients_opted(response);
         }
         else if (groupName == "JnJPercentageIncrease" || groupName == "JnJPerpatientAsso")
         {
              JnJData = BulletData(response); // Data will come
         }

         else if (groupName == "JnJlessone" || groupName == "JnJoneToTwo" || groupName == "JnJtwotothree" || groupName == "JnJthreetofour"
         || groupName == "JnJfourtofive" || groupName == "JnJgreaterfive") {
           JnJData = Avg_test(response);
         }
       }
         /////////////////////////////////////////////////////////////////////////////////////////////
         if(groupName == "JnJMobileActive" || groupName == "JnJSelectPlus" || groupName == "JnJVibe"
         || groupName == "JnJVerio" || groupName == "JnJLegacy")
         {
           stackedBarChart(JnJData,lblxAxis,lblyAxis);
         }
         else if(groupName == "JnJWebMobile" || groupName == "JnJHypose" || groupName == "JnJHyper" || groupName == "JnJseverLow"
          || groupName == "JnJseverHigh" || groupName == "JnJCommulativeBg" || groupName == "JnJManualBg" || groupName == "JnJFoodLog" || groupName == "JnJBg" || groupName == "JnJCumuManualBg"
          || groupName == "JnJTotalClinic"  || groupName == "JnJHCPS" || groupName == "JnJHCPAssets" || groupName == "JnJHCPActive"
          || groupName == "JnJAvgTest" || groupName == "JnJPatientDevice"  || groupName == "JnJPatientCreate"
          || groupName == "JnJPatientDeviceThisMonth" || groupName == "JnJpatientclinic" || groupName == "JnJBLE"
          || groupName == "JnJpatientopted" || groupName == "JnJlessone" || groupName == "JnJoneToTwo" || groupName == "JnJtwotothree" || groupName == "JnJthreetofour"
          || groupName == "JnJfourtofive" || groupName == "JnJgreaterfive" || groupName == "JnJTotalPatient" || groupName == "JnJAvgBg" )
         {
             simpleBarChart(JnJData, lblxAxis,lblyAxis);

         }
         else if (groupName == "JnJKaiser" || groupName == "JnJWalgreen")
         {
            simpleLineChart(JnJData, lblxAxis,lblyAxis);
         }
         else if (groupName == "JnJPercentageIncrease" || groupName == "JnJPerpatientAsso")
         {
           simpleBarChart(JnJData, "Percentage ","Percentage  In Month");

        }
        //  else if (groupName == "JnJPerpatientAsso")
        //  {
        //         //  BulletChart(
        //         //          response[0].Percentage,
        //         //          lblxAxis, //title
        //         //         lblyAxis, //subTitle
        //         //         ['Low Device Use', 'High Device Use'],
        //         //         ['Minimum Device Used','Average Device Used','Maximum Device Used'],
        //         //         ['Current Device Used']);
         //
        //  }
         else if (groupName == "JnJBulPerPatientDevice") {
           BulletChart(
                         response[0].Percentage,
                         lblxAxis, //title
                        lblyAxis, //subTitle
                         ['Low Device Use', 'High Device Use'],
                         ['Minimum Device Used','Average Device Used','Maximum Device Used'],
                         ['Current Device Used'],"JnJBulPerPatientDevice"
                       );
         }
     },
     error: function(error) {
         console.log(error);
     }
 });
}
