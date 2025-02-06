#include "pch.h"
#include <memory>

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

	void Inc()
	{
		++Sn;
	}

public:
	int Sn{ ++g_sn };
};

} // end of namespace

// https://en.cppreference.com/w/cpp/memory/shared_ptr
TEST(SmartPointerTests, SharedPtr) {
	std::shared_ptr<Foo> foo1;
	EXPECT_EQ(foo1, nullptr);

	auto sharedPtrSize = sizeof(foo1);
	EXPECT_EQ(sharedPtrSize, 16); // _Ptr_base size, element_type* _Ptr; _Ref_count_base* _Rep;

	foo1 = std::make_shared<Foo>();
	EXPECT_NE(foo1, nullptr);
	EXPECT_EQ(foo1->Sn, 1);

	std::shared_ptr<Foo> foo2 = foo1;
	EXPECT_NE(foo1, nullptr);
	EXPECT_NE(foo2, nullptr);
	EXPECT_EQ(foo1->Sn, foo2->Sn);
}

// https://en.cppreference.com/w/cpp/memory/weak_ptr
TEST(SmartPointerTests, WeakPtr) {
	std::weak_ptr<Foo> fooWeak;

	auto weakPtrSize = sizeof(fooWeak);
	EXPECT_EQ(weakPtrSize, 16); // _Ptr_base size, element_type* _Ptr; _Ref_count_base* _Rep;

	std::shared_ptr<Foo> fooShared = std::make_shared<Foo>();
	EXPECT_NE(fooShared, nullptr);

	// 사용 예시
	fooWeak = fooShared;
	EXPECT_EQ(fooWeak.expired(), false); // 유효성 체크 필요
	EXPECT_EQ(fooWeak.use_count(), 1);

	std::shared_ptr<Foo> fooSharedFromWeak = fooWeak.lock();
	EXPECT_NE(fooSharedFromWeak, nullptr);
	EXPECT_EQ(fooSharedFromWeak.use_count(), 2);

	// 소멸 처리 후 확인
	fooSharedFromWeak = nullptr;
	EXPECT_EQ(fooWeak.expired(), false);
	EXPECT_EQ(fooWeak.use_count(), 1);

	fooShared = nullptr;
	EXPECT_EQ(fooWeak.expired(), true);
	EXPECT_EQ(fooWeak.use_count(), 0);
}

// https://en.cppreference.com/w/cpp/memory/unique_ptr
TEST(SmartPointerTests, UniquePtr) {
	std::unique_ptr<Foo> foo1;
	EXPECT_EQ(foo1, nullptr);

	auto uniquePtrSize = sizeof(foo1);
	EXPECT_EQ(uniquePtrSize, 8); // pointer size

	foo1 = std::make_unique<Foo>();
	EXPECT_NE(foo1, nullptr);

	auto value = foo1->Sn;
	std::unique_ptr<Foo> foo2 = std::move(foo1);
	EXPECT_NE(foo2, nullptr);
	EXPECT_EQ(foo1, nullptr);

	// 값이 제대로 이동 했는가?
	EXPECT_EQ(foo2->Sn, value);
}
