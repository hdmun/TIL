def solution(id_list, report, k):
    answer = [0 for _ in id_list]

    reported = {}  # 신고한 애들
    report_dict = {id: set() for id in id_list}  # 중복 신고당한거 체크, 카운팅

    stopped = []
    for report_text in report:
        from_, to_ = report_text.split(' ')

        if from_ not in reported:
            reported[from_] = set()
        if to_ not in reported[from_]:
            reported[from_].add(to_)

        if to_ not in report_dict: 
            report_dict[to_] = set()
        if from_ not in report_dict[to_]:
            report_dict[to_].add(from_)
            
    
    for idx, id in enumerate(id_list):
        if id not in reported:
            continue

        for reported_user in reported[id]:
            count = len(report_dict[reported_user])
            if count >= k:
                answer[idx] += 1

    return answer


if __name__ == '__main__':
    def compare(l1, l2) -> bool:
        return all(l1[i] == val for i, val in enumerate(l2))

    result = solution(id_list=["muzi", "frodo", "apeach", "neo"], report=["muzi frodo","apeach frodo","frodo neo","muzi neo","apeach muzi"], k=2)
    assert compare(result, [2, 1, 1, 0])

    result = solution(id_list=["con", "ryan"], report=["ryan con", "ryan con", "ryan con", "ryan con"], k=3)
    assert compare(result, [0, 0])
