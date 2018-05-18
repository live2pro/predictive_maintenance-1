<!-- Include Date Range Picker -->
      
$(document).ready(function() {
      $('#MonthYear').datepicker({
          autoclose: true,
          minViewMode: 1,
          format: 'mm/yyyy'
      }).on('changeDate', function(selected){
              startDate = new Date(selected.date.valueOf());
              startDate.setDate(startDate.getDate(new Date(selected.date.valueOf())));
              $('.to').datepicker('setStartDate', startDate);
          });

    <!-- Include Date Range Picker -->
});
