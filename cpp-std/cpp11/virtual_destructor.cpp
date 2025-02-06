#include <iostream>

namespace virtual_destructor {
	class FooBase {
	public:
		FooBase()
		{
		}
		virtual ~FooBase()
		{
			std::cout << __FILE__ << ", FooBase::~FooBase()" << std::endl;
		}

		virtual void callback()
		{
			std::cout << __FILE__ << ", FooBase::callback()" << std::endl;
		}

	private:
		int base_{ 0 };
	};

	class Foo1 : public FooBase
	{
	public:
		Foo1()
			: FooBase()
		{
		}
		virtual ~Foo1()
		{
			std::cout << __FILE__ << ", Foo1::~Foo1()" << std::endl;
		}

		virtual void callback() override
		{
			std::cout << __FILE__ << ", Foo1::callback()" << std::endl;
		}

	private:
		int member_{ 1 };
	};
}

namespace cpp11 {

	void virtual_destructor()
	{
		std::cout << std::endl << "cpp11::virtual_destructor" << std::endl;

		virtual_destructor::FooBase* foo1 = new virtual_destructor::Foo1;
		delete foo1;
	}
}