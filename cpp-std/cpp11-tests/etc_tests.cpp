#include "pch.h"
#include <iostream>

namespace {

int g_sn{ 0 };

class Foo {
public:
	Foo() = default;
	Foo(Foo& rhs)
	{
		this->Sn = rhs.Sn;
	}
	Foo(Foo&& rhs) noexcept
	{
		this->Sn = rhs.Sn;
	}

	virtual ~Foo() = default;

	void something()
	{
		std::string funcName = __FUNCTION__;
		std::cout << funcName << std::endl;
	}

public:
	int Sn{ ++g_sn };
	int Data[100];
};

} // end of namespace


TEST(EtcTests, NullPointerTest) {
	Foo* pFoo = nullptr;

	pFoo->something();
}

TEST(EtcTests, NewFreeTest) {
	Foo* p1 = new Foo;
	// free(p1);  // 정의되지 않은 동작 (소멸자 호출 누락, 메모리 손상 가능)

	Foo* p2 = (Foo*)malloc(sizeof(Foo));
	// delete p2;  // 정의되지 않은 동작 (C 메모리 관리 방식과 충돌)
}
