#include <iostream>

namespace pure_virtual_function {
	class FooBase {
	public:
		FooBase(int base)
			: base_(base)
		{
			//callback(); // error
		}

		void func()
		{
			callback();
		}

		virtual void callback() = 0;

	private:
		int base_{ 0 };
	};

	class Foo : public FooBase
	{
	public:
		Foo()
			: FooBase(1)
		{
			//callback(); // ok
		}

		virtual ~Foo() {}

		virtual void callback()
		{
			std::cout << "Foo::callback() - pure_virtual_function" << std::endl;
		}

	private:
		int member_{ 1 };
	};
}


namespace cpp11 {

	void pure_virtual_function()
	{
		pure_virtual_function::FooBase* p = new pure_virtual_function::Foo;
		p->func();
	}
}