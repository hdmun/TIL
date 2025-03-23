using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotnet;

public interface IFoo
{
    void Foo();
}

public struct BaseFooStruct
{

}

public struct FooStruct
    // : BaseFooStruct // error
    // : FooClass // error
    : IFoo // ok
{
    public void Foo()
    {
    }
}

public class BaseFooClass
{
    public int Id;
}

public class FooClass : BaseFooClass
{
    ~FooClass()
    {
        Id = 0;
    }
}
