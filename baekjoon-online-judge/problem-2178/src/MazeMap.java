import java.util.LinkedList;
import java.util.List;

enum MapDirection {
    Up(0, -1),
    Down(0, 1),
    Left(-1, 0),
    Right(1, 0);

    private final int x;
    private final int y;

    MapDirection(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int x() { return x; }
    public int y() { return y; }
}

public class MazeMap {
    private final int width;
    private final int height;
    private final MazeState[][] mapData;

    public MazeMap(int width, int height, MazeState[][] mapData) {
        this.width = width;
        this.height = height;
        this.mapData = mapData;
    }

    private boolean isOutBound(Position position) {
        if (position.x() < 0 || position.y() < 0) {
            return true;
        }
        return this.width <= position.x() || this.height <= position.y();
    }

    public boolean isWall(Position position) {
        return mapData[position.y()][position.x()] == MazeState.Wall;
    }

    public List<Position> findPath(Position position) {
        List<Position> path = new LinkedList<>();
        for (MapDirection direction : MapDirection.values()) {
            Position nextPosition = position.from(direction.x(), direction.y());
            if (isOutBound(nextPosition)) {
                continue;
            }

            if (isWall(nextPosition)) {
                continue;
            }

            path.add(nextPosition);
        }

        return path;
    }
}
