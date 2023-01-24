import java.util.Arrays;
import java.util.LinkedList;
import java.util.Queue;


public class Main {
    public static void main(String[] args) {
        solution("4 6", new String[] {
                "101111",
                "101010",
                "101011",
                "111011"
        });

        solution("4 6", new String[] {
                "110110",
                "110110",
                "111111",
                "111101"
        });


        solution("2 25", new String[] {
                "1011101110111011101110111",
                "1110111011101110111011101"
        });


        solution("7 7", new String[] {
                "1011111",
                "1110001",
                "1000001",
                "1000001",
                "1000001",
                "1000001",
                "1111111"
        });
    }

    public static MazeState[] mapToMazeState(String mazeRowStr) {
        char[] mazeStrRowArray = mazeRowStr.toCharArray();
        MazeState[] mazeStateRow = new MazeState[mazeStrRowArray.length];
        for (int i = 0; i < mazeStrRowArray.length; i++) {
            mazeStateRow[i] = MazeState.from(mazeStrRowArray[i]);
        }
        return mazeStateRow;
    }

    public static int solution(String size, String[] mazeMapStr) {
        String[] mapSize = size.split(" ");
        int height = Integer.parseInt(mapSize[0]);
        int width = Integer.parseInt(mapSize[1]);

        MazeState[][] mapData = Arrays.stream(mazeMapStr)
                .map(Main::mapToMazeState)
                .toArray(MazeState[][]::new);

        MazeMap mazeMap = new MazeMap(width, height, mapData);

        int[][] distanceTable = new int[height][width];
        for (int[] distanceRow : distanceTable) {
            Arrays.fill(distanceRow, -1);
        }

        // 시작위치, 거리 초기화
        Queue<Position> queue = new LinkedList<>();
        queue.add(Position.of(0, 0));
        distanceTable[0][0] = 0;

        while (!queue.isEmpty()) {
            Position current = queue.poll();
            for (Position path : mazeMap.findPath(current)) {
                int distance = distanceTable[path.y()][path.x()];
                if (distance >= 0) {
                    continue;
                }

                // 거리 계산
                distanceTable[path.y()][path.x()] = distanceTable[current.y()][current.x()] + 1;
                queue.add(path);
            }
        }

        int exitDistance = distanceTable[height - 1][width - 1] + 1;
        System.out.println(exitDistance);
        return exitDistance;
    }
}