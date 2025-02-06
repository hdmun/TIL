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

// https://en.cppreference.com/w/cpp/memory/shared_ptr/atomic2
TEST(SmartPointerTests, AtomicSharedPtr) {
	std::atomic<std::shared_ptr<Foo> > foo1;
	EXPECT_EQ(foo1, nullptr);

	auto sharedPtrSize = sizeof(foo1);
	EXPECT_EQ(sharedPtrSize, 16); // _Ptr_base size, element_type* _Ptr; _Ref_count_base* _Rep;

	foo1 = std::make_shared<Foo>();
	EXPECT_NE(foo1, nullptr);
	EXPECT_EQ(foo1.load()->Sn, 1);

	std::shared_ptr<Foo> foo2 = foo1;
	EXPECT_NE(foo1, nullptr);
	EXPECT_NE(foo2, nullptr);
	EXPECT_EQ(foo1.load()->Sn, foo2->Sn);
}
