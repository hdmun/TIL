#include "pch.h"
#include <string>
#include <vector>
#include <deque>
#include <stack>
#include <queue>
#include <unordered_map>

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

public:
	int Sn{ ++g_sn };
};

} // end of namespace


namespace containers_tests {

TEST(VectorTests, DefaultSizeTest) {
	std::vector<__int32> vInt32;
	std::vector<__int64> vInt64;

	auto vInt32DefaultSize = sizeof(vInt32);
	auto vInt64DefaultSize = sizeof(vInt64);

	// 요소 사이즈에 따른 디폴트 사이즈는 동일함
	ASSERT_EQ(vInt32DefaultSize, 32);
	ASSERT_EQ(vInt64DefaultSize, 32);
}

TEST(VectorTests, PushBackTest) {
	std::vector<__int32> v;

	v.push_back(1);
	ASSERT_EQ(v.size(), 1);
	ASSERT_EQ(v.capacity(), 1);

	std::size_t prevCapacity = v.capacity();
	v.push_back(2);
	ASSERT_EQ(v.size(), 2);

	// 이전 용량의 절반만큼 확장하지만 필요한 사이즈보다 작다면 사이즈 만큼 늘림
	std::size_t incCapacity = prevCapacity + prevCapacity / 2;
	ASSERT_LT(incCapacity, v.size());
	ASSERT_EQ(v.capacity(), v.size()); // 2

	prevCapacity = v.capacity();
	v.push_back(3);
	ASSERT_EQ(v.size(), 3);
	ASSERT_EQ(v.capacity(), prevCapacity + prevCapacity / 2); // 3

	prevCapacity = v.capacity();
	v.push_back(4);
	ASSERT_EQ(v.size(), 4);
	ASSERT_EQ(v.capacity(), prevCapacity + prevCapacity / 2); // 4

	prevCapacity = v.capacity();
	v.push_back(5);
	ASSERT_EQ(v.size(), 5);
	ASSERT_EQ(v.capacity(), prevCapacity + prevCapacity / 2); // 6
}

TEST(DequeTests, DefaultSizeTest) {
	std::deque<__int32> dequeInt32;
	std::deque<__int64> dequeInt64;

	auto dequeInt32DefaultSize = sizeof(dequeInt32);
	auto dequeInt64DefaultSize = sizeof(dequeInt64);

	// 요소 사이즈에 따른 디폴트 사이즈는 동일함
	ASSERT_EQ(dequeInt32DefaultSize, 40);
	ASSERT_EQ(dequeInt64DefaultSize, 40);
}

TEST(DequeTests, PrimitivePushPopTest) {
	std::deque<__int32> d;

	d.push_back(300'000);
	d.push_front(200'000);
	d.push_back(400'000);
	d.push_front(100'000);

	ASSERT_EQ(d.front(), 100'000);
	ASSERT_EQ(d.back(), 400'000);

	d.pop_front();
	ASSERT_EQ(d.front(), 200'000);
	ASSERT_EQ(d.back(), 400'000);

	d.pop_back();
	ASSERT_EQ(d.front(), 200'000);
	ASSERT_EQ(d.back(), 300'000);
}

TEST(DequeTests, InstancePushPopTest) {
	std::deque<std::shared_ptr<Foo>> d;

    d.push_back(std::make_shared<Foo>()); // 1
	d.push_front(std::make_shared<Foo>()); // 2
	d.push_back(std::make_shared<Foo>()); // 3
	d.push_front(std::make_shared<Foo>()); // 4

	ASSERT_EQ(d.front()->Sn, 4);
	ASSERT_EQ(d.back()->Sn, 3);

	d.pop_front();
	ASSERT_EQ(d.front()->Sn, 2);
	ASSERT_EQ(d.back()->Sn, 3);

	d.pop_back();
	ASSERT_EQ(d.front()->Sn, 2);
	ASSERT_EQ(d.back()->Sn, 1);
}

TEST(StackTests, DefaultSizeTest) {
	std::stack<__int32> s;

	// 내부적으로 deque를 사용하기 때문에 deque 사이즈와 동일해야 함
	ASSERT_EQ(sizeof(s), sizeof(std::deque<__int32>));
}

TEST(QueueTests, DefaultSizeTest) {
	std::queue<__int32> q;

	// 내부적으로 deque를 사용하기 때문에 deque 사이즈와 동일해야 함
	ASSERT_EQ(sizeof(q), sizeof(std::deque<__int32>));
}

TEST(UnOrderedMapTests, DefaultSizeTest) {
	std::unordered_map<__int32, __int64> umap;

	auto defaultSize = sizeof(umap);
	ASSERT_EQ(defaultSize, 80);
}

TEST(UnOrderedMapTests, BucketSizeTest) {
	std::unordered_map<__int32, std::string> umap;

	std::size_t defaultBucketCount = umap.bucket_count();
	ASSERT_EQ(defaultBucketCount, 8); // default size

	////////////////////////////////////////////////////////////////////////////
	// 1~8 key 값으로 bucket 을 꽉채움
	for (int i = 1; i <= 8; ++i) {
		auto value = "value" + std::to_string(i);
		umap[i] = std::move(value);
	}

	// 버킷 확장
	umap[9] = "value 9";

	// 512 만큼 작다면 8배수로 늘어나야 함
	std::size_t incBucketCount = umap.bucket_count();
	ASSERT_EQ(incBucketCount, defaultBucketCount * 8); // 64

	////////////////////////////////////////////////////////////////////////////
	// 10~64 key 값으로 bucket 을 꽉채움
	for (int i = 10; i <= 64; ++i) {
		auto value = "value" + std::to_string(i);
		umap[i] = std::move(value);
	}

	// 버킷 확장
	umap[65] = "value 65";

	// 512 보다 작으니 8배수로 늘어나야 함
	incBucketCount = umap.bucket_count();
	ASSERT_EQ(incBucketCount, 64 * 8);

	////////////////////////////////////////////////////////////////////////////
	// 66~512 key 값으로 bucket 을 꽉채움
	for (int i = 66; i <= 512; ++i) {
		auto value = "value" + std::to_string(i);
		umap[i] = std::move(value);
	}

	// 버킷 확장
	umap[513] = "value 513";

	// 512 보다 크니 2배수 늘어나야 함
	ASSERT_EQ(incBucketCount * 2, umap.bucket_count()); // 1024

	////////////////////////////////////////////////////////////////////////////
	// 514~1024 key 값으로 bucket 을 꽉채움
	incBucketCount = umap.bucket_count();

	for (int i = 514; i <= 1024; ++i) {
		auto value = "value" + std::to_string(i);
		umap[i] = std::move(value);
	}

	// 버킷 확장
	umap[1025] = "value 1025";

	// 512 보다 크니 2배수 늘어나야 함
	ASSERT_EQ(incBucketCount * 2, umap.bucket_count()); // 2048

	////////////////////////////////////////////////////////////////////////////
	// 1025~2048 key 값으로 bucket 을 꽉채움
	incBucketCount = umap.bucket_count();

	for (int i = 1025; i <= 2048; ++i) {
		auto value = "value" + std::to_string(i);
		umap[i] = std::move(value);
	}

	// 버킷 확장
	umap[2049] = "value 2049";

	// 512 보다 크니 2배수 늘어나야 함
	ASSERT_EQ(incBucketCount * 2, umap.bucket_count()); // 4096
}

} // namespace smart_pointer_tests