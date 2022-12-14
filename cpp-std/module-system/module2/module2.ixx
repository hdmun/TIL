export module module2;

export namespace module1
{
    class Foo {
    public:
        Foo();
        virtual ~Foo() {}

        void Inc();
        void Dec();

    private:
        int member{ 0 };
    };

    export void Add();
}