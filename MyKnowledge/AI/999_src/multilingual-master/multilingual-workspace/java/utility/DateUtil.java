import java.util.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class DateUtil {
    /**
     * 現在日付(Date型)
     * 
     * @return Date型の現在日付
     */
    public Date currentDate() {
        return new Date();
    }

    /**
     * Date → String
     * 
     * @param 日付
     * @return 日付(String)
     */
    public String changeToString(Date date, String form) {
        SimpleDateFormat sdf = new SimpleDateFormat(form);
        return sdf.format(date);
    }

    /**
     * String型 → Date型
     * 
     * @param str_date
     * @return Date型の日付
     */
    public Date changeToDate(String str_date, String form) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat(form);
        return sdf.parse(str_date);
    }

    /**
     * Date → Integer
     * 
     * @param date
     * @return 日付(Integer)
     * @throws ParseException
     */
    public int changeToInt(Date date, String form) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat(form);
        return Integer.parseInt(sdf.format(date));
    }

    /**
     * 日付の加減算
     * 
     * @param date
     * @param changeDay
     * @return
     */
    public Date changeDate(Date date, int changeDay) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DATE, changeDay);
        return calendar.getTime();
    }

    /**
     * 任意の月の一か月間の日付を取得
     * 
     * @param date
     * @return
     * @throws ParseException
     */
    public List<Date> OneMonth(Date date) throws ParseException {

        List<Date> dateList = new ArrayList<Date>();

        Calendar calendar = Calendar.getInstance();
        // 月初をセット
        calendar.setTime(date);
        calendar.set(Calendar.DATE, 1);
        dateList.add(0, calendar.getTime());
        // 月末を検索
        int count = calendar.getMaximum(Calendar.DATE);

        for (int i = 1; i < count; i++) {
            calendar.set(Calendar.DATE, i + 1);
            dateList.add(i, calendar.getTime());
            System.out.println(dateList.get(i));
        }
        return dateList;
    }
}