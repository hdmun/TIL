# Item 3. private 생성자나 열거 타입으로 싱글턴임을 보증하라

인스턴스를 하나만 생성할 수 있는 클래스

- private 생성자
- public static 멤버

public stataic final 필드 방식

```java
public class ObjectManager {
    public static final ObjectManager INSTANCE = new ObjectManager();
    private ObjectManager() {}

    public void create() {}
    public void delete() {}
}
```

정적 팩터리 방식

```java
public class ObjectManager {
    private static final ObjectManager INSTANCE = new ObjectManager();
    private ObjectManager() {}

    public static ObjectManager getInstance() { return INSTANCE; }

    public void create() {}
    public void delete() {}
}
```

열거 타입 방식

- 상태를 가지지 않는 경우 열거 타입으로 구현이 가능

```java
public enum ObjectManager {
    INSTANCE;

    public void create() {}
    public void delete() {}
}
```

