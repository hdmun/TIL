#include "pch.h"

namespace {

class FooVector {
public:
	static FooVector&& Create(const std::vector<int>& data)
	{
		return FooVector(data);
	}

public:
	FooVector(const std::vector<int>& data)
		: _data(data)
	{
	}

	FooVector(FooVector&& rhs) noexcept
		: _data(std::move(rhs._data))
	{
	}

	virtual ~FooVector() = default;

	FooVector& operator= (FooVector&& rhs) noexcept
	{
		this->_data = std::move(rhs._data);
		return *this;
	}

	bool operator== (const FooVector& rhs) const
	{
		return _data == rhs._data;
	}

	std::int64_t size() const
	{
		return _data.size();
	}

	int pop()
	{
		int pop = _data.back();
		_data.pop_back();
		return pop;
	}

private:
	std::vector<int> _data;
};

void print(int& x)
{
	std::cout << "f(int&) : " << x << std::endl;
}

void print(int&& x)
{
	std::cout << "f(int&&) : " << x << std::endl;
}

} // namespace

// https://github.com/AnthonyCalandra/modern-cpp-features/blob/master/CPP11.md#move-semantics
TEST(MoveSementicsTests, FunctionCallTests) {
	int x = 0; // `x` is an lvalue of type `int`
	int& xl = x; // `xl` is an lvalue of type `int&`
	// int&& xr = x; // compiler error -- `x` is an lvalue
	int&& xr2 = 0; // `xr2` is an lvalue of type `int&&` -- binds to the rvalue temporary, `0`

	print(x);  // calls print(int&)
	print(xl); // calls print(int&)
	print(3);  // calls print(int&&)
	print(std::move(x)); // calls print(int&&)
	print(std::move(xl)); // calls print(int&&)

	print(x);  // calls print(int&)
	print(xl); // calls print(int&)

	print(xr2);            // calls print(int&)
	print(std::move(xr2)); // calls print(int&& x)
}

TEST(MoveSementicsTests, MoveInstanceTests) {
	// 
	std::vector<int> initData;
	for (int i = 0; i < 5; ++i) {
		initData.push_back(std::rand());
	}

	FooVector foo1(initData);
	EXPECT_EQ(foo1.size(), initData.size());

	FooVector foo2(std::move(foo1));
	EXPECT_NE(foo2.size(), foo1.size());
	EXPECT_EQ(foo2.size(), initData.size());

	FooVector foo3(std::move(FooVector::Create(initData)));
	EXPECT_EQ(foo2.size(), foo3.size());
}
