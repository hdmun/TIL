import java.util.Arrays;
import java.util.HashMap;

class Solution {
    public int[] solution(int[] fees, String[] records) {
        final int DefaultTime = fees[0];
        final int DefaultFee = fees[1];
        final double CountTime = fees[2];
        final int CountFee = fees[3];

        HashMap<Integer, Integer> parkingTimeTotals = new HashMap<>();
        HashMap<Integer, Integer> parkingCars = new HashMap<>();

        for (var recordStr : records) {
            final var record = recordStr.split(" ");
            final var timeStr = record[0].split(":");
            final var hours = Integer.parseInt(timeStr[0]);
            final var minutes = Integer.parseInt(timeStr[1]);
            final var carNumber = Integer.parseInt(record[1]);

            if (record[2].equals("IN")) {
                // 입차, 시간을 분으로 바꿔서 저장
                parkingCars.put(carNumber, hours * 60 + minutes);
            } else {
                // 출차
                var inTime = parkingCars.get(carNumber);
                var parkingTime = (hours * 60 + minutes) - inTime;  // 그대로 빼주면 됨

                if (parkingTimeTotals.containsKey(carNumber)) {
                    parkingTimeTotals.put(carNumber, parkingTimeTotals.get(carNumber) + parkingTime);
                } else {
                    parkingTimeTotals.put(carNumber, parkingTime);
                }
                parkingCars.remove(carNumber);
            }
        }

        // 출차 기록이 없는 차량 시간 계산
        for (var carNumber : parkingCars.keySet()) {
            var inTime = parkingCars.get(carNumber);
            var parkingTime = 1439 - inTime;

            if (parkingTimeTotals.containsKey(carNumber)) {
                parkingTimeTotals.put(carNumber, parkingTimeTotals.get(carNumber) + parkingTime);
            } else {
                parkingTimeTotals.put(carNumber, parkingTime);
            }
        }
        parkingCars.clear();

        int[] answer = new int[parkingTimeTotals.size()];
        Integer[] carNumbers = parkingTimeTotals.keySet().toArray(new Integer[0]);
        Arrays.sort(carNumbers);

        // 요금 계산
        for (int i = 0; i < answer.length; i++) {
            var parkingTime = parkingTimeTotals.get(carNumbers[i]) - DefaultTime;
            if (parkingTime < 0) {
                // 누적 주차 시간이 기본 시간이하라면, 기본 요금을 청구합니다.
                answer[i] = DefaultFee;
            } else {
                var parkingCountTime = (int) Math.ceil(parkingTime / CountTime);
                answer[i] = DefaultFee + parkingCountTime * CountFee;
            }
        }

        return answer;
    }

    public static void main(String[] args) {
        var test = new Solution();

        test.solution(new int[]{180, 5000, 10, 600}, new String[]{"05:34 5961 IN", "06:00 0000 IN", "06:34 0000 OUT", "07:59 5961 OUT", "07:59 0148 IN", "18:59 0000 IN", "19:09 0148 OUT", "22:59 5961 IN", "23:00 5961 OUT"});
        test.solution(new int[]{120, 0, 60, 591}, new String[]{"16:00 3961 IN","16:00 0202 IN","18:00 3961 OUT","18:00 0202 OUT","23:58 3961 IN"});
        test.solution(new int[]{1, 461, 1, 10}, new String[]{"00:00 1234 IN"});
    }
}