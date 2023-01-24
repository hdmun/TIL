package net.acmicpc.problem._7576;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

class Position {
    private final int x;
    private final int y;

    private Position(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int x() { return x; }

    public int y() { return y; }

    public Position from(int x, int y) {
        return new Position(this.x + x, this.y + y);
    }

    public static Position of(int x, int y) {
        return new Position(x, y);
    }
}

enum BoxState {
    Nothing,
    Unripe,
    Ripe;

    public static BoxState from(String state) {
        switch (state) {
            case "0":
                return Unripe;
            case "1":
                return Ripe;
            default:
                return Nothing;
        }
    }
}

enum Direction {
    Up(0, -1),
    Down(0, 1),
    Left(-1, 0),
    Right(1, 0);

    private final int x;
    private final int y;

    Direction(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int x() { return x; }
    public int y() { return y; }
}

class TomatoBox {
    private final int width;
    private final int height;
    private final BoxState[][] boxState;

    public void setState(int x, int y, BoxState state) {
        this.boxState[y][x] = state;
    }

    public List<Position> findTomato(Position position) {
        List<Position> tomatoes = new LinkedList<>();
        for (Direction direction : Direction.values()) {
            Position nextPosition = position.from(direction.x(), direction.y());
            if (isOutPosition(nextPosition)) {
                continue;
            }

            if (isNothing(nextPosition)) {
                continue;
            }

            tomatoes.add(nextPosition);
        }

        return tomatoes;
    }

    private boolean isNothing(Position position) {
        return boxState[position.y()][position.x()] == BoxState.Nothing;
    }

    private boolean isOutPosition(Position position) {
        if (position.x() < 0 || position.y() < 0) {
            return true;
        }
        return this.width <= position.x() || this.height <= position.y();
    }

    private TomatoBox(int width, int height) {
        this.width = width;
        this.height = height;
        this.boxState = new BoxState[height][width];
    }

    public static TomatoBox of(int width, int height) {
        return new TomatoBox(width, height);
    }
}

public class Main {
    public static void main(String[] args) throws IOException {
        final int answer = setup(new InputStreamReader(System.in));
        System.out.println(answer);
    }

    public static int setup(InputStreamReader input) throws IOException {
        BufferedReader inputReader = new BufferedReader(input);
        StringTokenizer token = new StringTokenizer(inputReader.readLine());

        // setup input data
        final Queue<Position> queue = new LinkedList<>();
        final int boxWidth = Integer.parseInt(token.nextToken());
        final int boxHeight = Integer.parseInt(token.nextToken());

        final int[][] tomatoRipeDayTable = new int[boxHeight][boxWidth];
        for (int[] tomatoBoxMarkRow : tomatoRipeDayTable) {
            Arrays.fill(tomatoBoxMarkRow, 0);
        }

        TomatoBox tomatoBox = TomatoBox.of(boxWidth, boxHeight);
        for (int m = 0; m < boxHeight; ++m) {
            token = new StringTokenizer(inputReader.readLine());
            for (int n = 0; n < boxWidth; ++n) {
                BoxState state = BoxState.from(token.nextToken());
                switch (state) {
                    case Ripe:
                        queue.add(Position.of(n, m));
                        break;
                    case Unripe:
                        tomatoRipeDayTable[m][n] = -1;
                        break;
                }
                if (state == BoxState.Ripe) {
                    queue.add(Position.of(n, m));
                }

                tomatoBox.setState(n, m, state);
            }
        }

        return solution(tomatoBox, queue, tomatoRipeDayTable);
    }

    public static int solution(TomatoBox tomatoBox, Queue<Position> queue, final int[][] tomatoRipeDays) {

        while (!queue.isEmpty()) {
            Position current = queue.poll();

            List<Position> tomatoes = tomatoBox.findTomato(current);
            for (Position tomato : tomatoes) {
                final int marked = tomatoRipeDays[tomato.y()][tomato.x()];
                if (marked >= 0) {
                    continue;
                }

                tomatoRipeDays[tomato.y()][tomato.x()] = tomatoRipeDays[current.y()][current.x()] + 1;
                queue.add(tomato);
            }
        }

        int maxDay = 0;
        for (int[] tomatoBoxMarkRow : tomatoRipeDays) {
            for (int ripeDay : tomatoBoxMarkRow) {
                if (ripeDay < 0) {
                    return -1;
                }

                maxDay = Math.max(maxDay, ripeDay);
            }
        }

        return maxDay;
    }
}