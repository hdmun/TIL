#include "pch.h"
#include <algorithm>
#include <vector>

namespace {

int g_sn{ 0 };

class Foo {
public:
	Foo()
		: Sn(++g_sn)
	{
	}

	Foo(Foo& rhs) noexcept
	{
		this->Sn = rhs.Sn;
	}
	Foo(Foo&& rhs) noexcept
	{
		this->Sn = rhs.Sn;
	}

	virtual ~Foo() = default;



public:
	int Sn;
};

} // end of namespace


namespace algorithm_tests {

// https://en.cppreference.com/w/cpp/algorithm/transform
TEST(TransformTests, BasicTest) {
	std::vector<__int32> vI32;
	for (int i = 1; i <= 5; ++i)
	{
		vI32.push_back(i);
	}

	std::vector<double> vD(vI32.size()); // size 까지 세팅을 해야 함
	// vD.reserve(vI32.size()); // capacity 만 늘리면 런타임 에러 발생
	std::transform(vI32.begin(), vI32.end(), vD.begin(), [](__int32 x) { return x / 10.0; });

	for (int i = 0; i < vD.size(); ++i)
	{
		ASSERT_EQ(vD[i], vI32[i] / 10.0);
	}
}

TEST(FindTests, PrimitiveTest) {
	std::vector<__int32> vI32;
	for (int i = 1; i <= 5; ++i)
	{
		vI32.push_back(i);
	}

	auto iterFounded = std::find(vI32.begin(), vI32.end(), 1);
	ASSERT_NE(iterFounded, vI32.end());
	ASSERT_EQ(*iterFounded, 1);

	auto iterNotFound = std::find(vI32.begin(), vI32.end(), 100);
	ASSERT_EQ(iterNotFound, vI32.end());
}

TEST(FindTests, ClassTest) {
	std::vector<Foo> vFoo;
	for (int i = 1; i <= 5; ++i)
	{
		vFoo.push_back(std::move(Foo()));
	}

	auto iterFounded = std::find_if(vFoo.begin(), vFoo.end(), [](const Foo& foo) { return foo.Sn == 1; });
	ASSERT_NE(iterFounded, vFoo.end());
	ASSERT_EQ(iterFounded->Sn, 1);

	auto iterNotFound = std::find_if(vFoo.begin(), vFoo.end(), [](const Foo& foo) { return foo.Sn == 100; });
	ASSERT_EQ(iterNotFound, vFoo.end());
}

// https://en.cppreference.com/w/cpp/algorithm/sort
TEST(SortTests, SortTest) {
	std::vector<__int32> vI32;
	for (int i = 1; i <= 5; ++i)
	{
		vI32.push_back(i);
	}

	// std::sort()
}

} // namespace algorithm_tests {