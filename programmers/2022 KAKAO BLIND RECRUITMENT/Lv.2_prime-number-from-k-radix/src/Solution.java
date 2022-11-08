public class Solution {
    public boolean isPrime(long number) {
        int sqrt = (int)(Math.sqrt(number) + 1);
        for (int i = 2; i < sqrt; i++) {
            if (number % i == 0)
                return false;
        }
        return true;
    }

    public int solution(int n, int k) {
        if (n == 1) {
            return 0;
        }

        // 진법 변환
        StringBuilder radixStr = new StringBuilder();
        if (k == 10) {
            radixStr.append(n);
        }
        else {
            for (int calcRadix = n; calcRadix > 0; ) {
                radixStr.insert(0, calcRadix % k);
                calcRadix /= k;
            }
        }

        int answer = 0;
        var numbers = radixStr.toString().split("0");
        for (var numberStr : numbers) {
            if (numberStr.equals("")) {
                continue;
            }

            var number = Long.parseLong(numberStr);
            if (number < 2) {
                continue;
            }

            if (number == 2) {
                answer += 1;
                continue;
            }

            if (!isPrime(number)) {
                continue;
            }

            answer += 1;
        }

        return answer;
    }

    public static void main(String[] args) {
        var test = new Solution();

        assert test.solution(437674, 3) == 3;
        assert test.solution(110011, 10) == 2;

        for (int i = 0; i <100000; i++) {
            int n = (int) (Math.random() * 999999);
            for (int k = 3; k < 10; k++) {
                test.solution(n, k);
            }
        }
    }
}
