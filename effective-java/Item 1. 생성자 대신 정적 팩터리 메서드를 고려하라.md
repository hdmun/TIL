# Item 1. 생성자 대신 정적 팩터리 메서드를 고려하라

디자인 패턴의 팩터리 메서드(Factory Method)와 다르다.

> `boolean` 타입의 박싱 클래스(boxed class)인 `Boolean`에서 발췌한 간단한 예시 코드

```java
public static Boolean valueOf(boolean b) {
    return b ? Boolean.TRUE : Boolean.FALSE;
}
```

정적 팩터리 메서드가 생성자보다 좋은 장점 다섯 가지

### 1. 이름을 가질 수 있다.

이름을 통해 '값이 소수인 `BigInteger` 반환'의 의미를 설명할 수 있다.

- `BigInteger(int, int, Random)`

- `BigInteger.probablePrime`


### 2. 호출될 때마다 인스턴스를 새로 생성하지는 않아도 된다.

불변 클래스(immutable class) 같은 경우 인스턴스를 미리 만들어 캐싱, 재활용이 가능하다.

예시를든 `Boolean.valueOf(boolean)` 메서드는 객체 생성을 하지 않는다.

플라이웨이트 패턴(Flyweigth pattern)도 이와 비슷한 기법

인스턴스 통제(instance-controlled) 클래스

- 싱글턴 (singlton)
- 인스턴스화 불가 (noninstantiable)


### 3. 반환 타입의 하위 타입 객체를 반환할 수 있는 능력이 있다.

구현 클래스를 공개하지 않고 객체를 반환 가능

### 4. 입력 매개변수에 따라 매번 다른 클래스의 객체를 반환할 수 있다.

### 5. 정적 팩터리 메서드를 작성하는 시점에는 반환할 객체의 클래스가 존재하지 않아도 된다.

단점

1. 상속을 하려면 public이나 protected 생성자가 필요하니 정적 팩터리 메서드만 제공하면 하위 클래스를 만들 수 없다.

2. 정적 팩터리 메서드는 프로그래머가 찾기 어렵다.


네이밍 방식

```java
Date d = Date.from(instant);

Set<Rank> faceCards = EnumSet.of(JACK, QUEEN, KING);

BigInteger prime = BigInteger.valueOf(Integer.MAX_VALUE);

StackWalker luke = StackWalker.getInstance(options);

Object newArray = Array.newInstance(classObject, arrayLen);

FileStore fs = Files.getFileStore(path);

BufferedReader br = Files.newBufferedReader(path);

List<Complaint> litany = Collections.list(legacyLitany);
```

각자 쓰임새에 따라 상대적인 장단점이 있음. 다만, 무작정 `public` 생성자를 제공하던 습관이 있으면 고치는게 좋다.

