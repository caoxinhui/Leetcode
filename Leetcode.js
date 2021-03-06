//5. 最长回文串 （动态规划）
var longestPalindrome = function (s) {
    let dp = []
    for (let i = 0; i < s.length; i++) {
        dp[i] = []
    }
    let max = -1
    let str = ''
    for (let k = 0; k < s.length; k++) {
        for (let i = 0; i + k < s.length; i++) {
            let j = i + k
            if (k === 0) {
                dp[i][j] = true
            } else if (k <= 2) {
                if (s[i] === s[j]) {
                    dp[i][j] === true
                } else {
                    dp[i][j] === false
                }
            } else {
                dp[i][j] = (dp[i + 1][j - 1] && s[i] === s[j]) ? true : false
            }
            if (j - i > max && dp[i][j]) {
                max = j - i
                str = s.substring(i, j + 1)
            }
        }
    }
    return str
};
var fourSumCount = function (A, B, C, D) {
    var mp = {};

    for (var i = 0; i < C.length; i++) {
        for (var j = 0; j < D.length; j++) {
            var sum = C[i] + D[j];
            mp[sum] = mp[sum] + 1 || 1;
        }
    }

    var res = 0;
    for (var i = 0; i < A.length; i++) {
        for (var j = 0; j < B.length; j++) {
            res += mp[-1 * (A[i] + B[j])] || 0;
        }
    }

    return res;
}
//17. Letter Combinations of a Phone Number
const digitToLetters = {
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz'
}
var letterCombinations = function (digits) {
    if (digits.length === 0) return [];

    let queue = [''];

    for (let i = 0; i < digits.length; i++) {
        const newQueue = [];
        const letters = digitToLetters[digits.charAt(i)];

        for (let j = 0; j < letters.length; j++)
            for (let k = 0; k < queue.length; k++)
                newQueue.push(queue[k] + letters.charAt(j));

        queue = newQueue;
    }

    return queue;
};
//18 4Sum
var fourSum = function (nums, target) {
    var ret = [];

    if (nums.length == 0)
        return ret;

    nums.sort(function (a, b) {
        return a - b;
    });

    for (var i = 0; i < nums.length; i++) {
        var target2 = target - nums[i];

        for (var j = i + 1; j < nums.length; j++) {
            var target3 = target2 - nums[j];

            var front = j + 1;
            var back = nums.length - 1;

            while (front < back) {
                var sum = nums[front] + nums[back];

                if (sum < target3)
                    front++;

                else if (sum > target3)
                    back--;

                else {
                    var temp = new Array(4);
                    temp[0] = nums[i];
                    temp[1] = nums[j];
                    temp[2] = nums[front];
                    temp[3] = nums[back];
                    ret.push(temp);

                    while (front < back && nums[front] === temp[2])
                        front++;

                    while (front < back && nums[back] === temp[3])
                        back--;
                }
            }

            while (j + 1 < nums.length && nums[j + 1] === nums[j])++j;
        }

        while (i + 1 < nums.length && nums[i + 1] === nums[i])++i;
    }

    return ret;
};
//19. Remove Nth Node From End of List
function removeNthFromEnd(head, n) {
    if (!head) {
        return null;
    }

    removeNthFromEnd(head.next, n);

    head.end = head.next &&
        head.next.hasOwnProperty('end') ? head.next.end + 1 : 0;

    if (head.end === n) {
        var del = head.next;
        head.next = head.next.next;
        del.next = null;
    } else if (head.end + 1 === n) {
        return head.next;
    }

    return head;
}
//20. Valid Parentheses
function validBraces(braces) {
    var matches = { '(': ')', '{': '}', '[': ']' };
    var stack = [];
    var currentChar;

    for (var i = 0; i < braces.length; i++) {
        currentChar = braces[i];

        if (matches[currentChar]) { // opening braces
            stack.push(currentChar);
        } else { // closing braces
            if (currentChar !== matches[stack.pop()]) {
                return false;
            }
        }
    }

    return stack.length === 0; // any unclosed braces left?
}
//21. Merge Two Sorted Lists
var mergeTwoLists = function (h1, h2) {
    if (!h1 || !h2) // return the non-empty one
        return h1 || h2

    if (h1.val > h2.val) // swap to make sure h1 is always smaller than h2
        [h1, h2] = [h2, h1]

    h1.next = mergeTwoLists(h1.next, h2)

    return h1;
};
// 22. Generate Parentheses
var generateParenthesis = function (n) {
    var leftArr = [], rightArr = [], count, result = [];
    for (count = 0; count < n; count++) {
        leftArr.push("(");
        rightArr.push(")");
    }
    function myFunction(left, right, arr) {
        if (left <= 0) {
            if (right > 0) {
                var i;
                for (i = 0; i < right; i++) {
                    arr += ")";
                }
            }
            result.push(arr);
            return;
        }
        myFunction(left - 1, right + 1, arr + "(");
        if (right > 0) {
            myFunction(left, right - 1, arr + ")");
        }
    }
    myFunction(n - 1, 1, "(");
    return result;
};
//24. Swap Nodes in Pairs
var swapPairs = function (head) {
    if (!head || !head.next) return head;
    let one = head;
    head = one.next;
    while (one && one.next) {
        let three = one.next.next;
        one.next.next = one;
        one.next = three && three.next ? three.next : three;
        one = three;
    }
    return head;
};
//25. Reverse Nodes in k-Group
function reverseKGroup(head, k) {
    if (!head) return null;
    var tail = head;
    for (var i = 1; i < k; i++) {
        tail = tail.next;
        if (!tail) return head;
    }
    var next = tail.next;
    tail.next = null;
    reverse(head);
    head.next = reverseKGroup(next, k);
    return tail;
}
function reverse(curr) {
    var prev = null;
    while (curr) {
        var next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}
//27. Remove Element
var removeElement = function (nums, val) {
    let length = nums.length;
    let i = 0;
    while (i < length) {
        if (nums[i] === val) {
            nums.splice(i, 1);
            length--;
        } else {
            i++;
        }
    }
    return nums.length;
};
//31. Next Permutation
var nextPermutation = function (nums) {
    var i = nums.length - 1;
    for (; i > 0; i--) {
        if (nums[i] > nums[i - 1]) {
            break;
        }
    }
    if (i != 0) {
        var x = nums.length - 1;
        for (; x >= i; x--) {
            if (nums[x] > nums[i - 1]) {
                break;
            }
        }
        swap(nums, i - 1, x);
    }
    reverse(nums, i, nums.length - 1);
    function swap(a, m, n) {
        var t = a[m];
        a[m] = a[n];
        a[n] = t;
    }
    function reverse(a, m, n) {
        for (; m < n; m++ , n--) {
            swap(a, m, n);
        }
    }
};
//39. Combination Sum
var combinationSum = function (candidates, target) {
    let res = new Array(target + 1);
    for (let t = 0; t <= target; t++) {
        res[t] = new Array(candidates.length);
        for (let i = 0; i < candidates.length; i++) {
            res[t][i] = [];
        }
    }
    // res[t][i] = solutions of subproblem of target t and pick from candidates[0..i];

    // initialize
    for (let i = 0; i < candidates.length; i++) {
        res[0][i] = [[]];
    }

    for (let t = 1; t <= target; t++) {
        for (let i = 0; i < candidates.length; i++) {
            // solutions not start with candidates[i]
            if (i > 0) {
                res[t][i - 1].forEach(way => {
                    res[t][i].push(way);
                });
            }
            // solutions start with candidates[i]
            if (candidates[i] <= t) {
                // console.log(t + ", " + i);
                res[t - candidates[i]][i].forEach(way => {
                    res[t][i].push(way.concat(candidates[i]));
                });
            }
        }
    }

    return res[target][candidates.length - 1];

};
//40. Combination Sum II
function combinationSum2(candidates, target) {
    var res = []; // [][]
    var prefix = [];
    candidates.sort((a, b) => a - b);
    search(0, target);
    return res;
    // rest为目标值
    function search(idx, rest) {
        if (rest === 0 && idx === candidates.length) {
            return res.push(prefix.slice());
        }

        if (rest < 0 || idx === candidates.length) {
            return;
        }
        prefix.push(candidates[idx]);
        search(idx + 1, rest - candidates[idx]);
        prefix.pop();
        if (prefix[prefix.length - 1] !== candidates[idx]) {
            search(idx + 1, rest);
        }
    }
}
//40. Combination Sum II
var combinationSum = function (candidates, target) {
    candidates = candidates.sort(function (val1, val2) { // step 1
        return val1 > val2 ? 1 : val1 < val2 ? -1 : 0;
    });

    var solution = [];
    var result = [];
    var pushVal = function (solution, n) {
        var sum = 0;
        for (var i = 0; i < solution.length; ++i) {
            sum += solution[i];
        }
        return (sum > target) ? true : (sum == target && solution.length == n) ? result.push(solution.slice(0)) : false;
    }
    var backTracking = function (k, n) {
        if (k != n) {
            for (var i = 0; i < candidates.length; ++i) {
                if (k > 0 && solution[k - 1] > candidates[i]) { continue; }
                solution[k] = candidates[i];

                if (pushVal(solution, n)) { solution.splice(solution.length - 1); return true; }
                arguments.callee(k + 1, n);

                solution.splice(solution.length - 1);
            }
        } else { return false; }
    }
    for (var i = 1; i <= Math.floor(target / candidates[0]); ++i) {
        backTracking(0, i);
    }
    return result;
};
//46. Permutations
var permute = function (nums) {
    const res = [];
    backtrack(nums, res);
    return res;
};
function backtrack(nums, res, n = 0) {
    if (n === nums.length - 1) {
        res.push(nums.slice(0));
        return;
    }
    for (let i = n; i < nums.length; i++) {
        swap(nums, i, n);
        backtrack(nums, res, n + 1);
        swap(nums, i, n);
    }
}
function swap(nums, i, j) {
    let temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}
//46. Permutations
var permute = function (nums) {
    let results = [];

    let permutations = (current, remaining) => {
        if (remaining.length <= 0) results.push(current.slice());
        else {
            for (let i = 0; i < remaining.length; i++) { // Loop through remaining elements
                current.push(remaining[i]); // Insert the iTH element onto the end of current
                permutations(current.slice(), remaining.slice(0, i).concat(remaining.slice(i + 1))); // Recurse with inserted element removed
                current.pop(); // Remove last inserted element for next iteration
            }
        }
    };

    permutations([], nums);
    return results;
};
//48. Rotate Image
var rotate = function (matrix) {
    for (var i = 0; i < matrix.length; i++) {
        for (var j = i; j < matrix[0].length; j++) {
            var temp = 0;
            temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix.length / 2; j++) {
            var temp = 0;
            temp = matrix[i][j];
            matrix[i][j] = matrix[i][matrix.length - 1 - j];
            matrix[i][matrix.length - 1 - j] = temp;
        }
    }
};
// 50. Pow(x,n)
var myPow = function (x, n) {
    var x = n > 0 ? x : 1 / x
    n = Math.abs(n)
    var map = new Map()
    var pow = (x, n) => {
        var result
        if (map.has(n)) {
            return map.get(n)
        }
        if (n === 0) return 1
        if (n === 1) return x
        var m = Math.floor(n / 2)
        result = pow(x, m) * pow(x, n - m)
        map.set(n, result)
        return result
    }
    return pow(x, n)
};
var myPow = function (x, n) {
    if (n < 0) return 1 / myPow(x, -n)
    if (n === 0) return 1
    if (n % 2 === 0) return myPow(x * x, n / 2)
    return myPow(x * x, Math.floor(n / 2)) * x
};
//53. Maximum Subarray
var maxSubArray = function (nums) {
    let max_so_far = -Infinity;
    let max_here = 0;

    for (let i = 0; i < nums.length; i++) {
        const val = nums[i];
        max_here = Math.max(val, max_here + val);
        max_so_far = Math.max(max_here, max_so_far);
    }

    return max_so_far;
};
var maxSubArray = function (nums) {
    let ans = nums[0]
    let sum = 0
    for (const num of nums) {
        if (sum > 0) {
            sum += num
        } else {
            sum = num
        }
        ans = Math.max(ans, sum)
    }
    return ans
};
//56. Merge Intervals
var merge = function (intervals) {
    intervals.sort((a, b) => a.start - b.start);

    return intervals.reduce((acc, interval) => {
        if (acc.length === 0) {
            acc.push(interval);
            return acc;
        }

        const { start: curStart, end: curEnd } = interval;
        const { start: lastStart, end: lastEnd } = acc[acc.length - 1];

        if (curStart <= lastEnd) {
            const newEnd = lastEnd > curEnd ? lastEnd : curEnd;
            acc[acc.length - 1] = new Interval(lastStart, newEnd);
        } else {
            acc.push(interval);
        }

        return acc;
    }, []);
};
//61. Rotate List
var rotateRight = function (head, k) {
    var size = 1,
        curr = head,
        positions,
        counter = 0;

    if (head === null || k <= 0)
        return head;

    while (curr.next !== null) {
        curr = curr.next;
        size++;
    }

    curr.next = head;

    positions = Math.abs(size - k % size) - 1;

    curr = head;

    while (counter < positions) {
        curr = curr.next;
        counter++;
    }

    head = curr.next;
    curr.next = null;

    return head;
};
//61. Rotate List
function rotateRight(head, k) {
    let before = { next: head };
    let prev = before;
    let len = 0;

    // 1. get total length of list
    for (; prev.next; prev = prev.next, len++);

    // 2. connect original tail to head
    // eg. 1 -> 2 -> 3 -> null
    // =>  [1] -> 2 -> 3 -> [1]
    prev.next = head;

    // find new head
    for (prev = before, k = len - k % len; k--; prev = prev.next);

    // cut the loop
    let newHead = prev.next;
    prev.next = null;
    return newHead;
}
// 61. Rotate List
var rotateRight = function (head, k) {
    var size = 1,
        curr = head,
        positions,
        counter = 0;
    if (head === null || k <= 0)
        return head;
    while (curr.next !== null) {
        curr = curr.next;
        size++;
    }
    curr.next = head;
    positions = Math.abs(size - k % size) - 1;
    curr = head;
    while (counter < positions) {
        curr = curr.next;
        counter++;
    }
    head = curr.next;
    curr.next = null;
    return head;
};
//62. Unique Paths
const createTwoDimenssionsArray = function createTwoDimenssionsArray(row, col, default_val) {
    return Array.apply(null, Array(row)).map(() => {
        return Array.apply(null, Array(col)).map(() => default_val);
    });
};
var uniquePaths = function (m, n) {
    let dp = Array(m)
    for (let i = 0; i < m; i++) {
        dp[i] = Array(n)
    }
    for (let i = 0; i < m; i++) {
        dp[i][0] = 1
    }
    for (let i = 0; i < n; i++) {
        dp[0][i] = 1
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
        }
    }
    return dp[m - 1][n - 1]
};
// with 2D array
var uniquePaths = function (m, n) {
    if (m == 0 || n == 0) {
        return 0;
    }

    const res = createTwoDimenssionsArray(m, n, 1);
    for (var i = 1; i < m; i++) {
        for (var j = 1; j < n; j++) {
            res[i][j] = res[i - 1][j] + res[i][j - 1];
        }
    }
    return res[m - 1][n - 1];
};
// with 1D array
var uniquePaths = function (m, n) {
    if (m == 0 || n == 0) {
        return 0;
    }
    const res = Array.apply(null, Array(n)).map(() => 1);

    for (var i = 1; i < m; i++) {
        for (var j = 1; j < n; j++) {
            res[j] = res[j - 1] + res[j];
        }
    }
    return res[n - 1];
};
//62. Unique Paths
var permutation = function (a, b) {
    if (b === 0) {
        return 1;
    }
    if (b > a / 2) { b = a - b; }
    var mula = 1, mulb = 1;
    for (var i = 0; i < b; i++) {
        mula = mula * (a - i);
        mulb = mulb * (b - i);
    }
    return mula / mulb;
}
var uniquePaths = function (m, n) {
    return permutation(m - 1 + n - 1, m - 1);
};
//66. Plus One
var plusOne = function (digits) {
    const length = digits.length;
    let i = length - 1;
    digits[i]++;
    while (i > 0 && digits[i] > 9) {
        digits[i] = 0;
        digits[i - 1]++;
        i--;
    }
    if (i === 0 && digits[0] > 9) {
        digits[0] = 0;
        digits.unshift(1);
    }
    return digits;
};
var plusOne = function (digits) {
    var s = 0;
    digits[digits.length - 1]++;
    for (var i = digits.length - 1; i >= 0; i--) {
        digits[i] += s;
        if (digits[i] >= 10) {
            s = 1;
            digits[i] = digits[i] - 10;
        } else {
            s = 0;
        }
    }
    if (s === 1) digits.unshift(1);
    return digits;
};
var plusOne = function (digits) {
    var arr = digits.reverse()
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] + 1 === 10) {
            arr[i] = 0
            if (i === arr.length - 1) {
                arr[i + 1] = 1
                break
            }
        } else {
            arr[i] = arr[i] + 1
            break
        }
    }
    return arr.reverse()
};
// 反转数组竟然还快一点，有问题吧？？？
var plusOne = function (digits) {
    for (var i = digits.length - 1; i >= 0; i--) {
        if (digits[i] + 1 === 10) {
            digits[i] = 0
            if (i === 0) {
                digits.unshift(1)
                break
            }
        } else {
            digits[i] = digits[i] + 1
            break
        }
    }
    return digits
};
//67. Add Binary
var addBinary = function (a, b) {
    var result = "";
    var i = a.length - 1;
    var j = b.length - 1;
    var carry = 0;
    while (i >= 0 || j >= 0 || carry > 0) {
        carry += i >= 0 ? parseInt(a[i--]) : 0;
        carry += j >= 0 ? parseInt(b[j--]) : 0;
        result = carry % 2 + result;
        carry = parseInt(carry / 2);
    }
    return result;
};
var addBinary = function (a, b) {
    var a1 = a.split('').reverse()
    var b1 = b.split('').reverse()
    var prefix = 0
    if (a1.length < b1.length) [a1, b1] = [b1, a1]
    var res = a1.map((n, i) => {
        var num = (b1[i] ? parseInt(b1[i]) : 0) + prefix + parseInt(n)
        prefix = num >= 2 ? 1 : 0
        return num % 2
    })
    if (prefix === 1) res.push(1)
    return res.reverse().join('')

};
//73. Set Matrix Zeroes
var setZeroes = function (matrix) {
    var r = matrix.length;
    var l = matrix[0].length;
    for (var i = 0; i < r; i++) {
        for (var j = 0; j < l; j++) {
            if (matrix[i][j] === 0 && 1 / matrix[i][j] === Infinity) {
                for (var x = 0; x < r; x++) {
                    matrix[x][j] = matrix[x][j] && -0;
                }
                for (var y = 0; y < l; y++) {
                    matrix[i][y] = matrix[i][y] && -0;
                }
            }
        }
    }
}
//74. 搜索二维矩阵
var searchMatrix = function (matrix, target) {
    if (matrix.length === 0) return false
    for (var i = 0; i < matrix.length; i++) {
        if (matrix[i].length === 0) return false
        if (target === Number(matrix[i][0]) || (Number(matrix[i + 1]) && target === Number(matrix[i + 1][0]))) return true
        if (target > Number(matrix[i][0])) {
            if (matrix[i + 1]) {
                if (Number(matrix[i + 1][0]) > Number(target)) {
                    for (var j = 1; j < matrix[0].length; j++) {
                        if (Number(matrix[i][j]) === target) return true
                    }
                }
            } else {
                for (var j = 1; j < matrix[0].length; j++) {
                    if (Number(matrix[i][j]) === target) return true
                }
            }
        }
    }
    return false
};
//75. Sort Colors
var sortColors = function (nums) {
    nums.sort(function (a, b) { return a - b });

};

//78. 子集
var subsets = function (nums) {
    if (nums.length === 0) {
        return [[]];
    }
    let [num, ...restNums] = nums;
    let restSubSets = subsets(restNums);
    return restSubSets.map(set => [...set, num]).concat(restSubSets);
};
var subsets = function (nums) {
    let ws = [[]];
    for (let i = 0; i < nums.length; ++i) {
        for (let j = 0, len = ws.length; j < len; ++j) {
            ws.push(ws[j].concat([nums[i]]));
        }
    }
    return ws;
};

//82. Remove Duplicates from Sorted List II
var deleteDuplicates = function (head) {
    var dummy = new ListNode(0);
    var fast = head;
    var slow = dummy;
    slow.next = fast;
    while (fast !== null) {
        while (fast.next !== null && fast.val == fast.next.val) {
            fast = fast.next;
        }
        if (slow.next != fast) {
            slow.next = fast.next;
            fast = slow.next;
        } else {
            slow = slow.next;
            fast = fast.next;
        }
    }
    return dummy.next;
};
//83. Remove Duplicates from Sorted List
var deleteDuplicates = function (head) {
    if (!head) { return head; }
    while (head.next && head.next.val === head.val) { head.next = head.next.next; }
    deleteDuplicates(head.next);
    return head;
};
//86. Partition List
var partition = function (head, x) {
    var beforeHead = { next: head };
    var insertPosition = beforeHead, prev = beforeHead, node = head;
    while (node) {
        var next = node.next;
        if (node.val < x) {
            if (insertPosition.next !== node) {
                prev.next = next;
                node.next = insertPosition.next;
                insertPosition.next = node;
            }
            insertPosition = node;
        } else {
            prev = node;
        }
        node = next;
    }
    return beforeHead.next;
};
//88. Merge Sorted Array
var merge = function (nums1, m, nums2, n) {
    const nums1_index = m - 1;
    const nums2_index = n - 1;
    const new_tail = m + n - 1;
    while (nums2_index >= 0) {
        if (nums1_index >= 0 && nums1[nums1_index] > nums2[nums2_index]) {
            nums1[new_tail] = nums1[nums1_index];
            nums1_index--;
        } else {
            nums1[new_tail] = nums2[nums2_index];
            nums2_index--;
        }
        new_tail--;
    }
};
// 90. Subsets II
var subsetsWithDup = function (nums) {
    if (nums === null || nums.length === 0) return [];

    var res = [[]];
    var map = {};

    // sort array to void duplicate
    nums.sort();

    for (value of nums) {
        for (i in res) {
            var temp = res[i].slice();
            temp.push(value);

            // transform into unique string using regx
            var str = temp.toString().replace(/\,/g, '');

            // using object key to check duplicate
            if (!map[str]) {
                map[str] = true;
                res.push(temp);
            }

        }
    }
    return res;
};
var subsetsWithDup = function (nums) {

    nums.sort();
    var res = [[]],
        count,
        subRes,
        preLength;

    for (let i = 0; i < nums.length; i++) {
        count = 1;

        while (nums[i + 1] && nums[i + 1] == nums[i]) {
            count += 1;
            i++;
        }

        preLength = res.length;
        for (let j = 0; j < preLength; j++) {
            subRes = res[j].slice();
            for (let x = 1; x <= count; x++) {
                if (x > 0) subRes.push(nums[i]);
                res.push(subRes.slice());
            }
        }
    }
    return res;
};
//93. Restore IP Addresses
restoreIP = (str, res = []) => {
    if (str.length == 0 && res.length == 4) return console.log(res)
    for (let i = 1; i <= Math.min(3, str.length); i++)
        if (parseInt(str.slice(0, i)) < 256)
            restoreIP(str.slice(i), res.concat(str.slice(0, i)))
}
//95. Unique Binary Search Trees II
var copy = function (node) {
    if (!node) return node;
    let result = new TreeNode(node.val);
    result.left = copy(node.left);
    result.right = copy(node.right);
    return result;
};
var generateTrees = function (n) {
    let levels = [null, [new TreeNode(1)]];
    for (let i = 2; i <= n; i++) {
        let curLevel = levels[i] = [];
        levels[i - 1].forEach(item => {
            let tmp = new TreeNode(i);
            tmp.left = copy(item);
            curLevel.push(tmp);
            let source = copy(item);
            let node = source;
            while (node) {
                let oldRight = node.right;
                node.right = new TreeNode(i);
                node.right.left = oldRight;
                curLevel.push(copy(source));
                node.right = oldRight;
                node = node.right;
            }
        });
    }
    return levels[n];
};
//104. Maximum Depth of Binary Tree
var maxDepth = function (root) {
    if (!root) return 0;
    var left = maxDepth(root.left);
    var right = maxDepth(root.right);
    return (left == 0 && right == 0) ? 1 + left + right : Math.max(left, right) + 1;
};
//110. Balanced Binary Tree
var isBalanced = function (root) {
    return helper(root) !== -1;
};
var helper = function (root) {
    if (!root) { return 0; }
    var left = helper(root.left);
    var right = helper(root.right);
    if (left === -1 || right === -1 || Math.abs(left - right) > 1) { return -1; }
    return 1 + Math.max(left, right);
};
//111. Minimum Depth of Binary Tree
var minDepth = function (root) {
    if (!root) return 0;
    var left = minDepth(root.left);
    var right = minDepth(root.right);
    return (left == 0 || right == 0) ? left + right + 1 : Math.min(left, right) + 1;
};
//112. Path Sum
var hasPathSum = function (root, sum) {
    if (!root) return false;
    if (root.left == null && root.right == null && sum - root.val == 0) return true;
    return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val);
};
//113. Path Sum II
var pathSum = function (root, sum) {
    if (!root) { return []; }

    let res = [];
    helper(root, res, [], 0, sum);

    return res;
};
var helper = function (root, res, path, curSum, sum) {
    path.push(root.val);
    curSum += root.val;

    if (root.left === null && root.right === null) {
        if (curSum === sum) { res.push(path.slice()); }
        return;
    }

    if (root.left) {
        helper(root.left, res, path, curSum, sum);
        path.pop();
    }
    if (root.right) {
        helper(root.right, res, path, curSum, sum);
        path.pop();
    }
};
//119. Pascal's Triangle II
var getRow = function (rowIndex) {

    var tmp = [1, 1];
    var output = [1, 1];


    if (rowIndex == 0) {
        return [1];
    } else if (rowIndex == 1) {
        return [1, 1];
    }

    for (var i = 2; i <= rowIndex; i++) {
        for (var j = 1; j < tmp.length; j++) {
            var addCount = tmp[j - 1] + tmp[j];
            output.splice(j, 1, addCount);
        }
        output.push(1);
        tmp = output.slice(0, output.length);
    }
    return output;
};
//129. Sum Root to Leaf Numbers
var sumNumbers = function (root) {
    return sum(root, 0);
    function sum(n, s) {
        return (n == null) ? 0 :
            ((n.right == null && n.left == null) ? s * 10 + n.val :
                sum(n.left, s * 10 + n.val) + sum(n.right, s * 10 + n.val));
    }
};
// 136. Single Number
var singleNumber = function (nums) {
    return nums.reduce((r, n) => r ^ n);
};
var singleNumber = function (nums) {
    nums.sort();
    for (var i = 0; i < nums.length; i += 2) {
        if (nums[i] != nums[i + 1]) {
            return nums[i];
        }
    }
};
var singleNumber = function (nums) {
    let hash = {};
    for (var i = 0; i < nums.length; i++) {
        if (hash[nums[i]]) {
            hash[nums[i]] += 1;
        }
        else {
            hash[nums[i]] = 1;
        }
    }
    for (var h in hash) {
        if (hash[h] === 1) {
            return +h;
        }
    }
};
//141. Linked List Cycle
var hasCycle = function (head) {
    if (!head || !head.next) { return false; }
    var visited = Symbol();
    while (head) {
        if (head[visited]) { return true; }
        head[visited] = true;
        head = head.next;
    }
    return false;
};
//141. Linked List Cycle
var hasCycle = function (head) {
    if (head == null || head.next == null) {
        return false;
    }
    var slow = head; //slow pointer moves one step forward
    var fast = head; //fast pointer moves two steps forward
    while (true) {
        //check if we reached the end of the list, --> not cyclic
        if (fast.next == null || fast.next.next == null) {
            return false;
        }
        slow = slow.next;
        fast = fast.next.next;
        //because fast moves as twice as fast, if it is cyclic,
        //it must reach slow at some point
        if (fast === slow) {
            return true;
        }
    }
};
//142. Linked List Cycle II
var detectCycle = function (head) {
    var __special__ = {};
    if (head === null) return null;

    function helper(head, headnext) {
        // console.log(head)
        if (head === null) {
            return null
        }
        if (headnext === __special__) {
            return head;
        }
        if (headnext === null) {
            return null;
        }
        head.next = __special__
        var result = helper(headnext, headnext.next);
        head.next = headnext;
        if (head === result) {
            return head;
        } else {
            return result;
        }
    }
    return helper(head, head.next)
};
//147. Insertion Sort List
function insertionSortList(head) {
    if (head === null) {
        return head
    }
    let node = head.next
    while (node) {
        let prev = head
        while (prev !== node && prev.val <= node.val) {
            prev = prev.next
        }
        if (prev === node) {
            // everyting remains sorted in this pass
            node = node.next
            continue
        }
        let temp1 = node.val
        let temp2 = null
        while (prev) {
            if (temp1 === null) {
                temp1 = prev.val
                prev.val = temp2
                temp2 = null
            } else if (temp2 === null) {
                temp2 = prev.val
                prev.val = temp1
                temp1 = null
            }
            if (prev === node) {
                break
            }
            prev = prev.next
        }
        node = node.next
    }
    return head
}
//148. Sort List
function mergeTwo(one, two) {
    var dummy = new ListNode(-1);
    var head = dummy;
    while (one && two) {
        if (one.val < two.val) {
            head.next = one;
            one = one.next;
        } else {
            head.next = two;
            two = two.next;
        }
        head = head.next;
    }
    if (one) head.next = one;
    if (two) head.next = two;
    return dummy.next;
}
function sortList(head) {
    if (!head || !head.next) return head;
    var fast = head, slow = head;
    while (fast.next && fast.next.next) {
        fast = fast.next.next;
        slow = slow.next;
    }
    var second = slow.next;
    slow.next = null;
    head = sortList(head);
    second = sortList(second);
    return mergeTwo(head, second);
}
//152. Maximum Product Subarray
var maxProduct = function (nums) {
    if (nums.length < 1) return 0;
    let max = -Infinity, min = 0, cur = 0;
    for (let n of nums) {
        if (n > 0) {
            min = (min === 0 ? 0 : min * n);
            cur = (cur <= 1 ? n : cur * n);
        } else if (n < 0) {
            let tempMin = min;
            min = (cur <= 1 ? n : cur * n);
            cur = (tempMin === 0 ? n : tempMin * n);
        } else {
            min = 0;
            cur = 0;
        }
        max = Math.max(max, cur);
    }
    return max;
};
// 160. Intersection of Two Linked Lists
var getIntersectionNode = function (headA, headB) {
    let set = new Set();
    while (headA || headB) {
        if (headA) {
            if (set.has(headA.val)) {
                return headA;
            }
            set.add(headA.val);
            headA = headA.next;
        }
        if (headB) {
            if (set.has(headB.val)) {
                return headB;
            }
            set.add(headB.val);
            headB = headB.next;
        }
    }
    return null;
};
// 167. Two Sum II - Input array is sorted
const twoSum = (numbers, target) => {
    let table = new Map()
    for (let i = 0; i < numbers.length; i++) {
        if (table.has(numbers[i])) {
            return [table.get(numbers[i]) + 1, i + 1]
        }
        table.set((target - numbers[i]), i)
    }
    return 'Not Found'
}
const numbers = [2, 3, 4];
console.log(twoSum(numbers, 6));
var twoSum = function (numbers, target) {
    var l = numbers.length, i = 0, j = l - 1;
    while (numbers[i] + numbers[j] !== target) {
        numbers[i] + numbers[j] < target ? i++ : j--;
    }
    return [i + 1, j + 1];
};
var twoSum = function (numbers, target) {
    var l = numbers.length, i = 0, j = l - 1;
    var sum = numbers[i] + numbers[j];
    while (sum !== target) {
        sum < target ? i++ : j--;
        sum = numbers[i] + numbers[j];
    }
    return [i + 1, j + 1];
};
//172. Factorial Trailing Zeroes
var trailingZeroes = function (n) {
    var cur = 5,
        total = 0;

    while (cur <= n) {
        total += Math.floor(n / cur);
        cur *= 5;
    }

    return total;
};
//189. Rotate Array
var rotate = function (nums, k) {
    while (k > 0) {
        nums.unshift(nums.pop());
        k--;
    }
};
var rotate = function (nums, k) {
    var n = nums.length - 1;
    for (var i = k; i > 0; i--) {
        nums.unshift(nums.splice(n, 1)[0])
    }
};
var rotate = function (nums, k) {
    k %= nums.length;
    [].unshift.apply(nums, nums.splice(nums.length - k, k));
};
var rotate = function (nums, k) {
    while (k > 0 && k--) nums.unshift(nums.pop());
};
//190. Reverse Bits
var reverseBits = function (n) {
    let b = (n.toString(2)).split('').reverse();
    return (parseInt((b.join('') + '00000000000000000000000000000000000000000000000000000').substr(0, 32), '2'));
};
var reverseBits = function (n) {
    let binput = (n.toString('2', n)).split('').reverse();
    while (binput.length < 32) {
        binput.push('0');
    }
    return (parseInt(binput.join(''), '2'));
};
//202. Happy Number
var isHappy = function (n) {
    var seen = {};
    while (n !== 1 && !seen[n]) {
        seen[n] = true;
        n = sumOfSquares(n);
    }
    return n === 1 ? true : false;
};
function sumOfSquares(numString) {
    return numString.toString().split('').reduce(function (sum, num) {
        return sum + Math.pow(num, 2);
    }, 0);
}
//203. Remove Linked List Elements
var removeElements = function (head, val) {
    var point = new ListNode(-1);
    var res = point;
    while (head !== null) {
        if (head.val !== val) {
            point.next = head;
            point = point.next;
        }
        head = head.next;
    }
    point.next = null;
    return res.next;
};
//204. Count Primes
var countPrimes = function (n) {
    var count = 0;
    var notPrime = new Array(n);
    notPrime.fill(false);
    for (var i = 2; i < n; i++) {
        if (notPrime[i] == false) {
            count++;
        }
        for (var j = 2; i * j < n; j++) {
            notPrime[i * j] = true;
        }
    }
    return count;
};
//206. Reverse Linked List
var reverseList = function (head) {
    return head ? reverse(head, null) : head;
};
function reverse(node, previous) {
    let newHead = node;

    // recursive call to tail
    if (node.next) newHead = reverse(node.next, node);
    // reverse from tail all the way up to head
    node.next = previous;

    return newHead;
};
//209. Minimum Size Subarray Sum
var minSubArrayLen = function (s, nums) {
    var numsLen = nums.length,
        sum = 0,
        right = 0,
        left = 0,
        minLen = Number.MAX_SAFE_INTEGER;

    while (right < numsLen) {
        sum += nums[right];
        if (sum >= s) {
            while (sum >= s) {
                sum -= nums[left];
                left++;
            }
            minLen = Math.min(right - left + 2, minLen);
        }
        right++;
    }

    return minLen === Number.MAX_SAFE_INTEGER ? 0 : minLen;

};
var combinationSum = function (candidates, target) {
    candidates = candidates.sort(function (val1, val2) { // step 1
        return val1 > val2 ? 1 : val1 < val2 ? -1 : 0;
    });
    // console.log("candidates=["+candidates+"];");
    var solution = [];
    var result = [];
    var pushVal = function (solution, n) {
        var sum = 0;
        for (var i = 0; i < solution.length; ++i) {
            sum += solution[i];
        }
        // console.log("solution=["+solution+"]; sum="+sum);
        return (sum > target) ? true : (sum == target && solution.length == n) ? result.push(solution.slice(0)) : false;
    }
    var backTracking = function (k, n) { // step 4
        if (k != n) {
            for (var i = 0; i < candidates.length; ++i) {
                if (k > 0 && solution[k - 1] > candidates[i]) { continue; }	// Elements in a combination (a1, a2, … , ak) must be in non-descending order. (ie, a1 ≤ a2 ≤ … ≤ ak).
                solution[k] = candidates[i];
                // console.log("candidates["+i+"]="+candidates[i]+";");
                if (pushVal(solution, n)) { solution.splice(solution.length - 1); return true; }
                arguments.callee(k + 1, n);
                // console.log("candidates["+i+"]="+candidates[i]+";");
                solution.splice(solution.length - 1);
            }
        } else { return false; }
    }
    for (var i = 1; i <= Math.floor(target / candidates[0]); ++i) { // step 3
        backTracking(0, i);
    }
    return result;
};
//216. Combination Sum III
var combinationSum3 = function (k, n) {
    var solution = [];	// length=k all possible Combination
    var result = [];
    var used = [];	// [1,2,...,9] each element can only be used once

    var backTracking = function (m, n) {
        if (m == k) {
            var sum = 0;
            for (var i = 0; i < solution.length; ++i) {
                sum += solution[i];
            }
            if (sum == n) {
                console.log(solution);	// print out all possible
                result.push(solution.slice(0));
            }
        } else {
            for (var i = 1; i <= 9; ++i) {
                if (used[i]) { continue; }	// when true, express the element(used[i]) has been used
                if (m > 0 && solution[m - 1] > i) { continue; }	// elements can only small to large order
                used[i] = true;
                solution[m] = i;
                arguments.callee(m + 1, n);
                used[i] = false;
            }
        }
    }

    backTracking(0, n);

    return result;
};
// 217. Contains Duplicate
var containsDuplicate = function (nums) {
    nums.sort();
    // duplicate numbers locate side by side in sorted array
    for (const [i, n] of nums.entries())
        if (i > 0 && n === nums[i - 1]) return true;
    return false;
};
var containsDuplicate = function (nums) {
    var hash = {};
    for (var i = nums.length - 1; i >= 0; i--) {
        if (hash[nums[i]]) {
            return true;
        } else {
            hash[nums[i]] = 1;
        }
    }
    return false;
};
// 219. Contains Duplicate II
var containsNearbyDuplicate = function (nums, k) {
    var mapObj = {},
        cur,
        numsLen = nums.length;

    for (cur = 0; cur < numsLen; cur++) {
        if (mapObj.hasOwnProperty(nums[cur])) {
            if (cur - mapObj[nums[cur]] <= k) {
                return true;
            }
            else {
                mapObj[nums[cur]] = cur;
            }
        }
        else {
            mapObj[nums[cur]] = cur;
        }
    }

    return false;

};
var containsNearbyDuplicate = function (nums, k) {
    var dict = {};
    for (var i = 0; i < nums.length; i++) {
        var char = nums[i];
        if (!dict.hasOwnProperty(char)) {
            dict[char] = i;
        } else {
            var previousIndex = dict[char];
            var diff = i - previousIndex;
            if (diff <= k) {
                return true
            }
            dict[char] = i;
        }
    }
    return false;
};
//220. Contains Duplicate III
var containsNearbyAlmostDuplicate = function (nums, k, t) {
    if (!nums || nums.length < 2) return false;

    var indices = [nums.length];

    // initialize indices array to [0,1,2,3,...].
    for (i = 0; i < nums.length; ++i) {
        indices[i] = i;
    }

    // sort indices base on their values.
    indices = indices.sort(function (a, b) {
        return nums[a] - nums[b];
    });

    // loop through the indices array.
    var i, j;
    for (i = 0; i < nums.length - 1; ++i) {
        var x = indices[i];

        for (j = i + 1; j < nums.length; ++j) {
            var y = indices[j];
            var diff = nums[y] - nums[x];
            var di = y > x ? y - x : x - y;

            // stop if the difference exceeds t.
            if (diff > t) break;

            if (di <= k) return true;
        }
    }

    return false
};
//226. Invert Binary Tree
var invertTree = function (root) {
    if (!root) { return root; }
    [root.left, root.right] = [invertTree(root.right), invertTree(root.left)]
    return root;
};
// 228. Summary Ranges
var summaryRanges = function (nums) {
    let res = [];
    for (let start = 0, i = 1; i <= nums.length; i++) {
        if (nums[i] - nums[i - 1] > 1 || i === nums.length) {
            res.push(nums[start] + (start < i - 1 ? '->' + nums[i - 1] : ''));
            start = i;
        }
    }
    return res;
};
var summaryRanges = function (nums) {
    var res = [];
    var j = 0;
    var a = 0;
    for (var i = 0; i < nums.length; i++) {
        a = nums[i];
        while (i < nums.length - 1 && nums[i + 1] - nums[i] == 1) i++;
        if (a != nums[i])
            res[j++] = a + "->" + nums[i];
        else
            res[j++] = a + "";
    }
    return res;
};
var summaryRanges = function (nums) {
    var result = [];
    if (!nums.length)
        return result;
    if (nums.length === 1) {
        result.push('' + nums[0]);
        return result;
    }
    var i = 1;
    if (nums[0] + 1 !== nums[1])
        result.push(nums[0].toString());
    while (i < nums.length) {
        var tmp = i;
        while (nums[i] === nums[i - 1] + 1) {
            i++;
        }
        if (tmp !== i) {
            result.push(nums[tmp - 1] + "->" + nums[i - 1]);
        }
        else {
            if (i === nums.length - 1)
                result.push(nums[i].toString());
            if (i < nums.length - 1 && nums[i + 1] !== nums[i] + 1)
                result.push(nums[i].toString());
            i++;
        }
    }
    return result;
};
// 229. Majority Element II
var majorityElement = function (nums) {
    var numsLength = nums.length;
    if (numsLength === 0) {
        return nums;
    }
    var hasOb = {};
    var result = [];
    for (var i = 0; i < numsLength; i++) {
        if (result.indexOf(nums[i]) !== -1)
            continue;
        if (!hasOb[nums[i]]) {
            hasOb[nums[i]] = 1;
        }
        else {
            hasOb[nums[i]] += 1;
        }

        if (hasOb[nums[i]] > Math.floor(numsLength / 3)) {
            result.push(nums[i]);
        }
    }
    return result;
};
//231. Power of Two
var isPowerOfTwo = function (n) {
    return n <= 0 ? false : !(n & (n - 1));
};
//233. Number of Digit One
var countDigitOne = function (n) {
    if (n <= 0) return 0;
    if (n < 10) return 1;
    var base = Math.pow(10, n.toString().length - 1);
    var answer = parseInt(n / base);
    return countDigitOne(base - 1) * answer + (answer === 1 ? (n - base + 1) : base) + countDigitOne(n % base);
};
var countDigitOne = function (n) {
    if (n <= 0) {
        return 0;
    } else if (n < 10) {
        return 1;
    }
    var len = n.toString().length;
    var base = Math.pow(10, len - 1);
    var answer = parseInt(n / base);
    var remainder = n % base;
    var oneInBase = 0;
    if (answer === 1) {
        oneInBase = n - base + 1;
    } else {
        oneInBase = base;
    }
    return countDigitOne(base - 1) * answer + oneInBase + countDigitOne(remainder);
};
//235. Lowest Common Ancestor of a Binary Search Tree
var lowestCommonAncestor = function (root, p, q) {
    if (root.val > p.val && root.val > q.val) {
        return lowestCommonAncestor(root.left, p, q);
    } else if (root.val < p.val && root.val < q.val) {
        return lowestCommonAncestor(root.right, p, q);
    } else {
        return root;
    }
};
//236. Lowest Common Ancestor of a Binary Tree
var lowestCommonAncestor = function (root, p, q) {
    if (root === null) return null;
    if (root === p || root === q) return root;
    var left = lowestCommonAncestor(root.left, p, q);
    var right = lowestCommonAncestor(root.right, p, q);
    return left !== null && right !== null ? root : left == null ? right : left;
};
// 237. Delete Node in a Linked List
var deleteNode = function (node) {
    if (node.val !== undefined && node.next !== undefined) {

        node.val = node.next.val;
        node.next = node.next.next;
    }

};
// 238. Product of Array Except Self
var productExceptSelf = function (nums) {
    var n = nums.length
    var result = new Array(n);
    result.fill(1);

    var left_fac = 1, right_fac = 1, i = 0
    while (i < n) {
        result[i] *= left_fac
        left_fac *= nums[i]
        i++
        result[n - i] *= right_fac
        right_fac *= nums[n - i]
    }
    return result
};
var productExceptSelf = function (nums) {
    var i;
    var res_before = [];
    var res_after = [];
    //var res = [];
    res_before[0] = 1;
    res_after[nums.length - 1] = 1;
    for (i = 1; i < nums.length; i++) {
        res_before[i] = res_before[i - 1] * nums[i - 1];
    }
    for (i = nums.length - 2; i >= 0; i--) {
        res_after[i] = res_after[i + 1] * nums[i + 1]
    }
    for (i = 0; i < nums.length; i++) {
        res_after[i] = res_before[i] * res_after[i];
    }
    return res_after;
};
//257. Binary Tree Paths
var binaryTreePaths = function (root) {
    if (!root) { return []; }
    if (!root.left && !root.right) { return [String(root.val)]; }
    const subpaths = binaryTreePaths(root.left).concat(binaryTreePaths(root.right));
    return subpaths.map(path => `${root.val}->${path}`);
};
//258. Add Digits
var addDigits = function (num) {
    return num == 0 ? 0 : (num % 9 == 0 ? 9 : (num % 9));
};
//260. Single Number III
var singleNumber = function (nums) {
    var t = nums.reduce((t, n) => t ^ n, 0);
    t = -t & t;
    return nums.reduce((r, n) => (n & t) ? [r[0] ^ n, r[1]] : [r[0], r[1] ^ n], [0, 0]);
};
var singleNumber = function (nums) {
    var map = {};
    for (var i = 0, len = nums.length; i < len; i++) {
        var key = nums[i];
        if (!map[key]) {
            map[key] = true;
        }
        else {
            delete map[key];
        }
    }
    var ret = [];
    for (var j in map) {
        ret.push(+j);
    }
    return ret;
};
//264. Ugly Number II
var nthUglyNumber = function (n) {
    var cache = [1];
    var p2 = 0;
    var p3 = 0;
    var p5 = 0;
    var m, r2, r3, r5;
    var i = cache.length;
    for (; i < n; i++) {
        r2 = cache[p2] * 2;
        r3 = cache[p3] * 3;
        r5 = cache[p5] * 5;
        m = Math.min(r2, r3, r5);
        if (m === r2) p2++;
        if (m === r3) p3++;
        if (m === r5) p5++;
        cache[i] = m;
    }
    return cache[n - 1];
};
//279. Perfect Squares
var numSquares = function (n) {
    var dp = new Array(n + 1);
    dp.fill(Number.MAX_VALUE);
    dp[0] = 0;
    for (var i = 1; i <= n; ++i) {
        var min = Number.MAX_VALUE;
        var j = 1;
        while (i - j * j >= 0) {
            min = Math.min(min, dp[i - j * j] + 1);
            ++j;
        }
        dp[i] = min;
    }
    return dp[n];
};
// 283. Move Zeroes
var moveZeroes = function (nums) {
    for (let i = 0, j = 0; i < nums.length; i++) {
        if (nums[j] === 0) {
            nums.splice(j, 1);
            nums.push(0);
        } else j++;
    }
};
var moveZeroes = function (nums) {
    if (nums === null) {
        return;
    }
    var pNum = 0;
    var pZero = 0;
    while (pNum < nums.length && pZero < nums.length) {
        if (nums[pZero] !== 0) {
            pZero++;
        } else if (nums[pNum] === 0 || pNum < pZero) {
            pNum++;
        } else if (pZero < pNum) {
            var aux = nums[pNum];
            nums[pNum] = nums[pZero];
            nums[pZero] = aux;
            pZero++;
            pNum++;
        }
    }
};
//328. Odd Even Linked List
var oddEvenList = function (head) {

    if (!head || !head.next || !head.next.next) return head;

    if (!head.next.next.next) {
        head.next.next.next = head.next; // 3 -> 2 -> 3
        head.next = head.next.next; // 1 -> 3 -> 2 -> 3
        head.next.next.next = null; // 1 -> 3 -> 2
        return head;
    }

    var odd = head,
        even = head.next,
        first = even;

    while (even && even.next) {

        odd.next = even.next;
        even.next = even.next.next;
        even = even.next;
        odd = odd.next

    }

    odd.next = first;

    return head;

};
//349. Intersection of Two Arrays
var intersection = function (nums1, nums2) {
    let intersection = {};

    // collect unique intersections
    for (const n of nums1)
        if (nums2.indexOf(n) !== -1) intersection[n] = 1;

    // extract intersections and convert to numbers
    return Object.keys(intersection).map(val => parseInt(val));
};
var intersection = function (nums1, nums2) {
    var set = new Set();
    var len1 = nums1.length;
    // var len2=nums2.length;
    for (var i = 0; i < len1; i++) {
        if (nums2.indexOf(nums1[i]) >= 0) {
            set.add(nums1[i]);
        }
    }
    var result = Array.from(set);
    return result;
};
//345. Reverse Vowels of a String
var reverseVowels = function (s) {
    var inArray = function (s, arr) {
        for (let i = 0; i < arr.length; i++) {
            if (s.toLowerCase() == arr[i]) {
                return true
            }
        }
        return false;
    }
    const v = ['a', 'e', 'i', 'o', 'u'];

    var arr = [];
    for (let i = 0; i < s.length; i++) {
        if (inArray(s[i], v)) {
            arr.push(s[i])
        }
    }

    let x = 1;
    let res = '';
    for (let i = 0; i < s.length; i++) {
        if (inArray(s[i], v)) {
            res += arr[arr.length - x];
            x++;
        } else {
            res += s[i]
        }
    }

    return res;
};
//350
function findSame(arr1, arr2) {
    var len1 = arr1.length, len2 = arr2.length;
    var i = 0, j = 0, result = [];
    while (i < len1 && j < len2) {
        if (arr1[i] == arr2[j]) {
            result.push(arr1[i]);
            i++;
            j++;
        } else if (arr1[i] < arr2[j]) {
            i++;
        } else {
            j++;
        }
    }
    return result;
};
// 389. Find the Difference
var findTheDifference = function (s, t) {
    let str = '';
    s = s.split('').sort().join('');
    t = t.split('').sort().join('');
    for (let i = 0; i < t.length; i++) {
        if (!(s[i] === t[i])) {
            str += t[i];
            break;
        }
    }
    return str;
};
//397. Integer Replacement
var integerReplacement = function (n) {
    if (n === 1) {
        return 0;
    }
    else if (n % 2 === 0) {
        return integerReplacement(n / 2) + 1;
    } else {
        return Math.min(integerReplacement(n - 1), integerReplacement(n + 1)) + 1;
    }
};
var integerReplacement = function (n) {
    var result = [];
    result.push(0);
    result.push(0);
    for (var i = 2; i <= n; i++) {
        if (i % 2 == 0) {
            result[i] = result[i / 2] + 1;
        } else {
            result[i] = Math.min(result[(i - 1) / 2], result[(i + 1) / 2]) + 2;
        }
    }
    return result[n];
};
//401. Binary Watch
var readBinaryWatch = function (num) {
    var result = [];
    for (var i = 0; i <= 11; i++) {
        for (var j = 0; j <= 59; j++) {
            if ((countSetBit(i) + countSetBit(j)) === num) {
                result.push(i + (j < 10 ? ':0' : ':') + j);
            }
        }
    }
    return result;
};
function countSetBit(num) {
    var binary = num.toString(2);
    var count = 0;
    for (var i = 0; i < binary.length; i++) {
        if (binary[i] == 1) {
            count++;
        }
    }
    return count;
}
//415. Add Strings
var addStrings = function (num1, num2) {
    num1 = num1.split('');
    num2 = num2.split('');
    var i = num1.length - 1;
    var j = num2.length - 1;
    var up = 0;
    var res = '';
    while (i >= 0 || j >= 0 || up > 0) {
        var sum = up;
        if (i >= 0) {
            sum += parseInt(num1[i]);
        }
        if (j >= 0) {
            sum += parseInt(num2[j]);
        }
        if (sum >= 10) {
            sum -= 10;
            up = 1;
        } else {
            up = 0;
        }
        res = sum + res;
        i--;
        j--;
    }
    return res;
};
var addStrings = function (num1, num2) {
    var num1 = num1.split('').reverse();
    var num2 = num2.split('').reverse();
    var len1 = num1.length;
    var len2 = num2.length;
    var jinwei = 0;
    var result = [];
    var newRes;
    if (len1 > len2) {
        num1.push(0);
        for (var j = len2; j <= len1; j++) {
            num2.push(0);
        }
        for (var i = 0; i < len1; i++) {
            var num = parseInt(num1[i]) + parseInt(num2[i]) + jinwei;
            if (num < 10) {
                result.push(num);
                jinwei = 0;
            } else {
                result.push(num - 10);
                jinwei = 1;
            }
        }
        if (result[result.length - 1] == 0) {
            result.pop();
        }
        newRes = result.reverse().join("");

    } else {
        num2.push(0);
        for (var j = len1; j <= len2; j++) {
            num1.push(0);
        }
        for (var i = 0; i < len2; i++) {
            var num = parseInt(num1[i]) + parseInt(num2[i]) + jinwei;
            if (num < 10) {
                result.push(num);
                jinwei = 0;
            } else {
                result.push(num - 10);
                jinwei = 1;
            }
        }
        if (result[result.length - 1] == 0) {
            result.pop();
        }
        newRes = result.reverse().join("");
    }

    return (newRes + "");
};
//437. Path Sum III
var pathSum = function (root, sum) {
    if (!root) return 0;
    return findPath(root, sum) + pathSum(root.left, sum) + pathSum(root.right, sum);
    function findPath(root, sum) {
        var res = 0;
        if (!root) return res;
        if (sum == root.val) res++;
        res += findPath(root.left, sum - root.val);
        res += findPath(root.right, sum - root.val);
        return res;
    };
};
// 441. Arranging Coins
var arrangeCoins = function (n) {
    if (n <= 1) {
        return n;
    } else {
        var t = Math.floor(Math.sqrt(2 * n) - 1);
        if ((t + 2) * (t + 1) / 2 <= n) {
            return t + 1;
        }
        if ((t + 2) * (t + 1) / 2 > n) {
            return t;
        }
    }
};
// 445. Add Two Numbers II
var addTwoNumbers = function (l1, l2) {
    let createf = (v, nxt) => { let n = new ListNode(v); n.next = nxt; return n; }
        , f = (l1, h1, l2, h2) => {
            if (!l1.next && !l2.next) {
                let s = l1.val + l2.val;
                return {
                    n: createf(s % 10),
                    carry: Math.floor(s / 10)
                }
            }

            let r = f(l1.next || h1,
                l1.next ? h1 : h2,
                l2.next || h2,
                l2.next ? h2 : h1),
                ignore1 = r.ignore1 || !l1.next,
                ignore2 = r.ignore2 || !l2.next,
                sum = (ignore1 ? 0 : l1.val)
                    + (ignore2 ? 0 : l2.val)
                    + r.carry
                ;

            return {
                n: (ignore1 && ignore2 && sum == 0) ? r.n : createf(sum % 10, r.n),
                carry: Math.floor(sum / 10),
                ignore1: ignore1,
                ignore2: ignore2
            };
        },
        r = f(l1, l2, l2, l1);
    return r.carry == 0 ? r.n : createf(r.carry, r.n);

};
// 445. Add Two Numbers II
var addTwoNumbers = function (l1, l2) {
    var s1 = [];
    var s2 = [];

    while (l1 !== null) {
        s1.push(l1.val);
        l1 = l1.next;
    }
    while (l2 !== null) {
        s2.push(l2.val);
        l2 = l2.next;
    }

    var sum = 0;
    var list = new ListNode(0);
    while (s1.length > 0 || s2.length > 0) {
        if (s1.length > 0) sum += s1.pop();
        if (s2.length > 0) sum += s2.pop();
        list.val = sum % 10;
        //>>表示要向右移动
        var head = new ListNode((sum / 10) >> 0);
        head.next = list;
        list = head;
        sum = (sum / 10) >> 0;
    }
    return list.val === 0 ? list.next : list;
};
//447. Number of Boomerangs
function numberOfBoomerangs(points) {
    let res = 0;
    points.forEach(p1 => {
        const map = {};
        points.forEach(p2 => {
            const dist = Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2);
            res += (map[dist] || 0) * 2;
            map[dist] = (map[dist] || 0) + 1;
        });
    });
    return res;
}
//447. Number of Boomerangs
var numberOfBoomerangs = function (points) {
    var len = points.length;
    var count = 0;
    for (var i = 0; i < len; i++) {
        var map = new Map();
        for (var jk = 0; jk < len; jk++) {
            if (i === jk) {
                continue;
            }
            var d = getDistance(points[i], points[jk]);
            if (map.get(d)) {
                map.set(d, map.get(d) + 1);
            } else {
                map.set(d, 1);
            }
        }
        map.forEach(function (m) {
            count += m * (m - 1);
        });
    }

    return count;
};
function getDistance(i, j) {
    return (i[0] - j[0]) * (i[0] - j[0]) + (i[1] - j[1]) * (i[1] - j[1]);
}
// 448. Find All Numbers Disappeared in an Array
var findDisappearedNumbers = function (nums) {
    var rtn = new Array(0),
    var s = new Set(nums);
    for (var i = 1; i <= nums.length; i++) {
        if (!s.has(i)) rtn.push(i);
    }
    return rtn;
};
// 451. Sort Characters By Frequency
var frequencySort = function (str) {
    const tally = str
        .split('')
        .reduce((obj, key) => {
            obj[key] ? obj[key]++ : obj[key] = 1;
            return obj;
        }, {});

    return Object
        .keys(tally)
        .map(key => key.repeat(tally[key]))
        .sort((a, b) => b.length - a.length)
        .join('')
};
var frequencySort = function (s) {
    var map = {};
    var result = '';
    var stringArray = s.split('');
    //put the character count into a map
    for (var i = 0; i < stringArray.length; i++) {
        map[stringArray[i]] = map[stringArray[i]] + 1 || 1;
    }
    //sort the map first, then push into the result
    Object.keys(map).sort((a, b) => map[b] - map[a]).forEach(function (v) {
        for (var j = 0; j < map[v]; j++) {
            result += v;
        }
    });

    return result;

};
var frequencySort = function (s) {

    let chars = new Set();
    let freqMap = {};

    for (let i = 0; i < s.length; i++) {
        let ch = s.charAt(i);
        chars.add(ch);
        if (!freqMap.hasOwnProperty(ch)) freqMap[ch] = 0;
        freqMap[ch]++;
    }

    let bucket = {};

    for (let ch of chars) {
        let freq = freqMap[ch];
        if (!bucket.hasOwnProperty(freq)) bucket[freq] = [];
        bucket[freq].push(new Array(freq + 1).join(ch));
    }

    result = [];

    for (let i = s.length; i > 0; i--) {
        if (bucket.hasOwnProperty(i)) {
            result.push(...bucket[i]);
        }
    }

    return result.join('');

};
//453. Minimum Moves to Equal Array Elements
var minMoves = function (nums) {
    return nums.reduce((s, n) => s + n, -nums.length * Math.min(...nums))
}
//454. 4Sum II
var fourSumCount = function (A, B, C, D) {
    var mp = {};

    for (var i = 0; i < C.length; i++) {
        for (var j = 0; j < D.length; j++) {
            var sum = C[i] + D[j];
            mp[sum] = mp[sum] + 1 || 1;
        }
    }

    var res = 0;
    for (var i = 0; i < A.length; i++) {
        for (var j = 0; j < B.length; j++) {
            res += mp[-1 * (A[i] + B[j])] || 0;
        }
    }

    return res;
}
// 454. 4Sum II
var fourSumCount = function (A, B, C, D) {
    var mp = {};

    for (var i = 0; i < C.length; i++) {
        for (var j = 0; j < D.length; j++) {
            var sum = C[i] + D[j];
            mp[sum] = mp[sum] + 1 || 1;
        }
    }

    var res = 0;
    for (var i = 0; i < A.length; i++) {
        for (var j = 0; j < B.length; j++) {
            res += mp[-1 * (A[i] + B[j])] || 0;
        }
    }

    return res;
}
//461. Hamming Distance
var hammingDistance = function (x, y) {
    return (x ^ y).toString(2).replace(/0/g, '').length;
};
//462. Minimum Moves to Equal Array Elements II
var minMoves2 = function (nums) {
    nums.sort(function (a, b) { return a - b });
    var mid = Math.floor(nums.length / 2);
    var res = 0;
    for (var i = 0; i < nums.length; i++) {
        res += Math.abs(nums[i] - nums[mid]);
    }
    return res;

};
// 463 Island Perimeter
var islandPerimeter = function (grid) {
    const rows = grid.length;
    const cols = grid[0].length;

    var perimeter = 0;

    for (var row = 0; row < rows; row++) {
        for (var col = 0; col < cols; col++) {
            if (!grid[row][col]) continue;

            perimeter += 4;

            // abstract the number of adjacent island
            if (row > 0 && grid[row - 1][col]) perimeter--;
            if (col > 0 && grid[row][col - 1]) perimeter--;
            if (row < rows - 1 && grid[row + 1][col]) perimeter--;
            if (col < cols - 1 && grid[row][col + 1]) perimeter--;
        }
    }

    return perimeter;
};
//475. Heaters
var findRadius = function (houses, heaters) {
    // We need to find the max of min distance
    heaters.sort((a, b) => a - b);
    let max = 0;
    for (let i = 0; i < houses.length; i++) {
        let curr = closestHeaterDistance(houses[i], heaters, 0, heaters.length - 1);
        max = Math.max(max, curr);
    }
    return max;
};
function closestHeaterDistance(house, heaters, low, high) {
    if (low === high) return Math.abs(house - heaters[low]);
    let middle = Math.floor((low + high) / 2);
    if (house < heaters[middle]) {
        if (middle === 0) return Math.abs(house - heaters[0]);
        if (house > heaters[middle - 1]) {
            return Math.min(Math.abs(house - heaters[middle]), Math.abs(house - heaters[middle - 1]));
        }
        return closestHeaterDistance(house, heaters, low, middle - 1);
    } else if (house > heaters[middle]) {
        if (middle === heaters.length - 1) return Math.abs(house - heaters[heaters.length - 1]);
        if (house < heaters[middle + 1]) {
            return Math.min(Math.abs(house - heaters[middle]), Math.abs(house - heaters[middle + 1]));
        }
        return closestHeaterDistance(house, heaters, middle + 1, high)
    }
    return 0;
}
//475. Heaters
var findRadius = function (houses, heaters) {
    var radius = houses.map(function (x) { return [x, 0, Number.MAX_VALUE]; }).concat(heaters.map(function (x) { return [x, 1, Number.MAX_VALUE] }));
    radius.sort(function (a, b) {
        if (a[0] > b[0])
            return 1;
        else if (a[0] < b[0])
            return -1;
        else
            return 0
    });

    function updateRadius(fromLeftToRight) {
        var indices = [];
        var i;
        for (i = 0; i < radius.length; i++)
            indices.push(i);
        if (!fromLeftToRight) {
            indices.reverse();
        }
        var curHeater = null;
        for (i = 0; i < indices.length; i++) {
            var idx = indices[i];
            if (radius[idx][1] == 1)
                curHeater = radius[idx][0];
            else if (curHeater)
                radius[idx][2] = Math.min(radius[idx][2], Math.abs(radius[idx][0] - curHeater));
        }
    }

    updateRadius(true);
    updateRadius(false);

    var ret = 0;
    for (var i = 0; i < radius.length; i++) {
        if (radius[i][1] === 0) {
            ret = Math.max(ret, radius[i][2]);
        }
    }
    return ret;
};
//476. Number Complement
var findComplement = function (num) {
    var newN;
    var n;
    newN = (num.toString(2)).split('');
    var result = [];
    for (var i = 0; i < newN.length; i++) {
        if (newN[i] == '1') {
            result[i] = '0';
        } else {
            result[i] = '1';
        }
    }
    n = parseInt(result.join(''), 2);
    return n;
};
//495. Teemo Attacking
var findPoisonedDuration = function (timeSeries, duration) {
    if (timeSeries === null || timeSeries.length === 0) {
        return 0;
    }
    var count = 0;
    for (var i = 0; i < timeSeries.length - 1; i++) {
        if (timeSeries[i + 1] - timeSeries[i] >= duration) {
            count += duration;
        } else {
            count += timeSeries[i + 1] - timeSeries[i];
        }
    }
    return count + duration;
};
// 500. Keyboard Row
var findWords = function (words) {
    var resultWords = [];
    for (var i = 0; i < words.length; i++) {
        if (isSameRow(words[i]))
            resultWords.push(words[i]);
    }
    return resultWords;
};
var isSameRow = function (word) {
    var rowNumber = getKeyboardRow(word.charAt(0));
    for (var i = 1; i < word.length; i++) {
        if (getKeyboardRow(word.charAt(i)) !== rowNumber)
            return false;
    }
    return true;
};
var getKeyboardRow = function (char) {
    var currentChar = char.toLowerCase();
    var charRowMap = {
        "q": 1, "w": 1, "e": 1, "r": 1, "t": 1, "y": 1, "u": 1, "i": 1, "o": 1, "p": 1,
        "a": 2, "s": 2, "d": 2, "f": 2, "g": 2, "h": 2, "j": 2, "k": 2, "l": 2,
        "z": 3, "x": 3, "c": 3, "v": 3, "b": 3, "n": 3, "m": 3
    }
    return charRowMap[currentChar];
};
// 500. Keyboard Row
var findWords = function (words) {
    var wordsNew = [], result = [], keyboard = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
    words.forEach(function (ele, index) { wordsNew[index] = ele.toLowerCase() });

    wordsNew.forEach(function (ele, index) {
        for (var j = 0; j < 3; j++) {
            var flag1 = 0;
            for (var i = 0; i < ele.length; i++) {
                if (keyboard[j].indexOf(ele[i]) == -1) { flag1++ }
            }
            if (flag1 === 0) { result.push(words[index]) }
        }
    });
    return result;
};
// 500. Keyboard Row
var findWords = function (words) {
    let obj = {
        top: 'qwertyuiop',
        center: 'asdfghjkl',
        bottom: 'zxcvbnm',
    };
    let arr = [];
    for (let val of words) {
        let vals = val.toLowerCase();
        let target;
        let record = '';
        for (let v of Object.values(obj)) {
            if (~v.indexOf(vals[0])) target = v;
        }
        for (let alpha of vals) {
            if (~target.indexOf(alpha)) record += '1';
        }
        if (record.length === vals.length) arr.push(val);
    }
    return arr;
};
// 500. Keyboard Row
var findWords = function (words) {
    let obj = {
        top: 'qwertyuiop',
        center: 'asdfghjkl',
        bottom: 'zxcvbnm',
    };
    let arr = [];
    for (let val of words) {
        let vals = val.toLowerCase();
        let target;
        let alpha = vals.split('');
        for (let v of Object.values(obj)) {
            if (~v.indexOf(vals[0])) target = v;
        }
        if (alpha.every(value => ~target.indexOf(value))) arr.push(val);
    }
    return arr;
};
// 500. Keyboard Row
var findWords = (words) => {
    const Map = { q: 1, w: 1, e: 1, r: 1, t: 1, y: 1, u: 1, i: 1, o: 1, p: 1, a: 2, s: 2, d: 2, f: 2, g: 2, h: 2, j: 2, k: 2, l: 2, z: 3, x: 3, c: 3, v: 3, b: 3, n: 3, m: 3 }
    let temp = 0
    let RightWords = []
    words.forEach((item) => {
        if (item.length == 1) RightWords.push(item)
        temp = Map[item[0].toLowerCase()]
        for (let i = 1, length = item.length; i < length; i++) {
            if (temp != Map[item[i].toLowerCase()]) {
                return
            }
            if (i == item.length - 1) {
                RightWords.push(item)
            }
        }
    })
    return RightWords;
}
String.prototype.reverse = function () {
    return this.split("").reverse().join("");
};
// 501. Find Mode in Binary Search Tree
var findMode = function (root) {
    var res = [];
    if (!root) {
        return res;
    }
    var tem;
    var temCount = 0;
    var maxCount = 0;
    var pNode = root;


    while (pNode !== null) {
        var pLeft = pNode.left;
        if (pLeft) {
            while (pLeft.right !== null && pLeft.right !== pNode) {
                pLeft = pLeft.right;
            }
            if (pLeft.right === null) {
                pLeft.right = pNode;
                pNode = pNode.left;
                continue;
            } else {
                pLeft.right = null;
            }
        }

        if (pNode.val === tem) {
            temCount++;
        } else {
            if (tem !== undefined) {
                if (temCount > maxCount) {
                    res.length = 0;
                    maxCount = temCount;
                    res.push(tem);
                }
                else if (temCount === maxCount) {
                    res.push(tem);
                }
            }
            tem = pNode.val;
            temCount = 0;
        }
        pNode = pNode.right;
    }
    if (temCount > maxCount) {
        res.length = 0;
        maxCount = temCount;
        res.push(tem);
    }
    else if (temCount === maxCount) {
        res.push(tem);
    }
    return res;
};
//521. Longest Uncommon Subsequence I
var findLUSlength = function (a, b) {
    return a == b ? -1 : Math.max(a.length, b.length);
};
//525. Contiguous Array
var findMaxLength = function (nums) {
    if (nums.length < 2) return 0;

    // Could save some space by modifying nums but we still use O(n)
    let sums = [0];
    let maxIndexes = { '0': 0 };
    for (let i = 0; i < nums.length; i++) {
        sums.push(sums[i] + (nums[i] || -1));
        maxIndexes[sums[i + 1]] = i + 1;
    }

    let max = 0;
    for (let i = 0; i < sums.length; i++) {
        max = Math.max(max, maxIndexes[sums[i]] - i);
        if (max >= sums.length - i - 1) break;
    }

    return max;
};
//530. Minimum Absolute Difference in BST
function getMinimumDifference(root, vals = { prev: undefined, min: Number.MAX_VALUE }) {
    if (!root) {
        return;
    }

    getMinimumDifference(root.left, vals);

    if (vals.prev >= 0) {
        vals.min = Math.min(Math.abs(vals.prev - root.val), vals.min);
    }

    vals.prev = root.val;

    getMinimumDifference(root.right, vals);

    return vals.min;
}
// 532. K-diff Pairs in an Array
var findPairs = function (nums, k) {
    if (k < 0) return 0;
    let seen = {};
    let pairs = {};
    return nums.reduce((count, a) => {
        count += isNewPair(seen, pairs, a, a - k) + isNewPair(seen, pairs, a, a + k);
        seen[a] = 1;
        return count;
    }, 0);
};
function isNewPair(seen, pairs, a, b) {
    if (!seen[b]) return false;
    let key = a < b ? a + ',' + b : b + ',' + a;
    if (!pairs[key]) {
        pairs[key] = 1;
        return true;
    }
    return false;
}
//541. Reverse String II
var reverseStr = function (s, k) {
    var len = s.length;
    if (len < 2 * k) { // Check if length is less than 2*k
        if (len >= k)
            // reverse the first k chars and leave the rest as orig
            return s.slice(0, k).reverse() + s.slice(k)
        else return s.reverse(); // if less than k, return orig
    }
    return s.slice(0, k).reverse() + // reverse first k chars
        s.slice(k, 2 * k) + // leave chars from k to 2k as orig
        reverseStr(s.slice(2 * k), k); // recurs
};
//557. Reverse Words in a String III
var reverseWords = function (s) {
    var newS = s.split(' ');
    var result = [];
    for (var i = 0; i < newS.length; i++) {
        result.push(newS[i].split('').reverse().join(''));
    }
    return result.join(' ');
};
