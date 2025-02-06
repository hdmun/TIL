#include <iostream>
#include <utility>
#include <vector>


namespace {
	class Foo {
	public:
		Foo(std::initializer_list<int> values) noexcept
			: data(values)
		{
			std::cout << "call " << "Foo()" << std::endl;
		}

		Foo(Foo& foo) = default;

		Foo(Foo&& foo) noexcept
			: data(std::move(foo.data))
		{
			std::cout << "call " << "Foo(Foo&& foo)" << std::endl;
		}

		// Deleted Copy Constructor and Assignment Operator
		Foo(const Foo&) = delete;
		Foo& operator=(const Foo&) = delete;

		virtual ~Foo()
		{
		}

		std::int64_t size()
		{
			return data.size();
		}

		Foo& operator=(Foo&& other) noexcept
		{
			data = std::move(other.data);
			return *this;
		}

	private:
		std::vector<int> data;
	};

	Foo&& _CreateDanglingReference(std::initializer_list<int> values)
	{
		Foo foo(values);
		return Foo(std::move(foo));
	}
}

namespace cpp11 {
    void move_semantics()
    {
		// dangling reference
		Foo&& foo = _CreateDanglingReference({ 1, 2, 3, 4, 5 });
		std::int64_t size = foo.size();
		std::cout << "foo.size() : " << size << std::endl;
    }
}