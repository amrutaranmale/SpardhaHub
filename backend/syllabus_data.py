"""Complete study syllabus for every exam + branch-wise engineering hub.

Each topic carries actual study content (revision-notes capsules) so students can
study inside SpardhaHub. Content is intentionally concise (150-250 words/topic) —
production builds can plug in a CMS for longer content.
"""

# ---------------------------------------------------------------------------
# Engineering branch hub — Diploma & Degree
# ---------------------------------------------------------------------------
ENGINEERING_HUB = {
    "Computer Science / IT": {
        "icon": "Cpu",
        "accent": "#EF9F27",
        "diploma": {
            "duration": "3 years (after Class 10)",
            "subjects": [
                {
                    "name": "Programming in C",
                    "chapters": [
                        {
                            "name": "Introduction to C",
                            "topics": [
                                {
                                    "id": "c-intro",
                                    "title": "What is C and why learn it",
                                    "summary": "C is a procedural, mid-level language developed by Dennis Ritchie in 1972 at Bell Labs. It is the parent of C++, Java, C#, and influenced almost every modern language. C gives direct access to memory via pointers, making it perfect for systems software, operating systems (Linux, Windows kernels) and embedded devices.",
                                    "key_points": [
                                        "Compiled language — produces a fast machine-code binary",
                                        "Portable: write once, compile anywhere with a C compiler (gcc, clang)",
                                        "Used in OS, device drivers, embedded firmware, game engines",
                                        "Strong foundation for learning any other language",
                                    ],
                                    "books": ["Let Us C — Yashavant Kanetkar", "The C Programming Language — Kernighan & Ritchie"],
                                },
                                {
                                    "id": "c-firstprog",
                                    "title": "Your first C program & compilation",
                                    "summary": "Every C program starts execution from the `main()` function. The classic 'Hello World' demonstrates: header inclusion (`#include <stdio.h>`), function definition, the `printf()` library call, and the `return 0;` statement signalling successful exit. Compilation has 4 phases — preprocessing, compilation to assembly, assembly to object code, linking to final executable.",
                                    "key_points": [
                                        "`#include <stdio.h>` brings in standard input-output functions",
                                        "`main()` is the program entry point",
                                        "`printf(\"...\\n\")` prints formatted text",
                                        "Compile: `gcc hello.c -o hello` then run: `./hello`",
                                    ],
                                    "books": ["Let Us C — Chapter 1", "Programming in ANSI C — E. Balagurusamy"],
                                },
                            ],
                        },
                        {
                            "name": "Data Types, Operators & Control Flow",
                            "topics": [
                                {
                                    "id": "c-datatypes",
                                    "title": "Primitive data types & memory",
                                    "summary": "C provides primitive types: `int` (4 bytes, ~2.1 billion range), `float` (4 bytes, 7-digit precision), `double` (8 bytes, 15-digit), `char` (1 byte, ASCII). Use `sizeof(type)` to print size. Modifiers `short`, `long`, `signed`, `unsigned` let you control storage. Choose the smallest type that fits your range to save memory on embedded systems.",
                                    "key_points": [
                                        "`int x = 10;` declaration + initialization",
                                        "`%d` for int, `%f` for float, `%c` for char in printf",
                                        "Overflow: storing 130 in `signed char` wraps to -126",
                                        "`const int` makes a variable read-only",
                                    ],
                                    "books": ["Let Us C — Chapter 2"],
                                },
                                {
                                    "id": "c-control",
                                    "title": "if-else, switch, loops",
                                    "summary": "Control flow lets your program make decisions. `if-else` evaluates a condition; `switch-case` is faster for many equal-value branches; loops repeat code. `for` is for known iteration counts, `while` for condition-based, `do-while` runs at least once.",
                                    "key_points": [
                                        "`if (x > 0) { ... } else { ... }`",
                                        "`switch (ch) { case 'a': ... break; default: ... }`",
                                        "`for (int i = 0; i < n; i++)` — most common loop",
                                        "`break` exits a loop; `continue` skips to next iteration",
                                    ],
                                    "books": ["Let Us C — Chapter 3-4"],
                                },
                            ],
                        },
                    ],
                },
                {
                    "name": "Data Structures",
                    "chapters": [
                        {
                            "name": "Arrays, Strings & Pointers",
                            "topics": [
                                {
                                    "id": "ds-array",
                                    "title": "Arrays — sequential memory",
                                    "summary": "An array stores a fixed number of elements of the same type in contiguous memory. Index starts at 0. Accessing `arr[i]` is O(1). Insertion/deletion in the middle is O(n) because elements must shift. Arrays in C decay to pointers when passed to functions — you must pass the length separately.",
                                    "key_points": [
                                        "`int marks[5] = {90, 85, 78, 92, 88};`",
                                        "Time complexity: access O(1), search O(n), insert/delete O(n)",
                                        "Multi-dim: `int mat[3][3]`",
                                        "Sorting algorithms (bubble, insertion, quick) operate on arrays",
                                    ],
                                    "books": ["Data Structures Using C — Reema Thareja"],
                                },
                                {
                                    "id": "ds-linkedlist",
                                    "title": "Singly Linked List",
                                    "summary": "A linked list is a linear data structure where each node contains data + a pointer to the next node. The first node is called HEAD, the last node points to NULL. Unlike arrays, linked lists grow dynamically and insertion/deletion at the head is O(1).",
                                    "key_points": [
                                        "`struct Node { int data; struct Node *next; };`",
                                        "Insertion at head: O(1); at tail: O(n)",
                                        "Traversal is sequential — no random access",
                                        "Use for queues, stacks, hash table chaining",
                                    ],
                                    "books": ["Data Structures Using C — Chapter 5"],
                                },
                            ],
                        },
                    ],
                },
                {
                    "name": "Database Management",
                    "chapters": [
                        {
                            "name": "Relational Model & SQL",
                            "topics": [
                                {
                                    "id": "db-rel",
                                    "title": "Relational model — tables, keys, constraints",
                                    "summary": "Proposed by E.F. Codd (1970), the relational model stores data as relations (tables) of rows (tuples) and columns (attributes). Primary key uniquely identifies each row. Foreign key references a primary key in another table to enforce referential integrity.",
                                    "key_points": [
                                        "Primary key — unique, not null",
                                        "Foreign key — links two tables",
                                        "ACID properties — Atomicity, Consistency, Isolation, Durability",
                                        "Normalization — 1NF, 2NF, 3NF, BCNF to remove redundancy",
                                    ],
                                    "books": ["Database System Concepts — Korth", "Fundamentals of DBMS — Elmasri"],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        "degree": {
            "duration": "4 years (after Class 12 with PCM)",
            "subjects": [
                {
                    "name": "Data Structures & Algorithms",
                    "chapters": [
                        {
                            "name": "Searching & Sorting",
                            "topics": [
                                {
                                    "id": "dsa-bsearch",
                                    "title": "Binary Search",
                                    "summary": "Binary search finds an element in a SORTED array in O(log n) by repeatedly halving the search space. Compare middle element; if smaller, search right half; if larger, search left half. Recursive or iterative. Variants: lower_bound, upper_bound, search in rotated array.",
                                    "key_points": [
                                        "Pre-condition: array must be sorted",
                                        "Time O(log n), Space O(1) iterative",
                                        "Used in std::lower_bound, database indexing (B-trees use the same idea)",
                                        "Off-by-one errors are common — test edges carefully",
                                    ],
                                    "books": ["Introduction to Algorithms — CLRS", "Algorithms — Sedgewick"],
                                },
                                {
                                    "id": "dsa-quicksort",
                                    "title": "Quicksort — pivot and partition",
                                    "summary": "Quicksort picks a pivot, partitions the array so smaller elements go left and larger go right, then recursively sorts both partitions. Average O(n log n), worst O(n²) when pivot is poor. Lomuto and Hoare partition schemes. Use random pivot to avoid worst case on sorted input.",
                                    "key_points": [
                                        "In-place sort, O(log n) recursion stack",
                                        "Not stable — equal elements may swap",
                                        "Used in std::sort (introsort variant)",
                                        "Quickselect uses quicksort idea to find k-th smallest in O(n) avg",
                                    ],
                                    "books": ["CLRS Chapter 7"],
                                },
                            ],
                        },
                        {
                            "name": "Graph Algorithms",
                            "topics": [
                                {
                                    "id": "dsa-bfs",
                                    "title": "BFS — Breadth First Search",
                                    "summary": "BFS explores a graph level by level using a queue. Starts at source, visits all neighbours, then their neighbours, and so on. Used to find shortest path in unweighted graphs, level-order traversal of trees, finding connected components.",
                                    "key_points": [
                                        "Uses a queue (FIFO)",
                                        "Time O(V + E), Space O(V) for visited array",
                                        "Finds shortest path in unweighted graphs",
                                        "Real-world: GPS navigation, social network friend-of-friend",
                                    ],
                                    "books": ["CLRS Chapter 22"],
                                },
                                {
                                    "id": "dsa-dijkstra",
                                    "title": "Dijkstra's Shortest Path",
                                    "summary": "Dijkstra's algorithm finds the shortest path from a source to all vertices in a weighted graph with non-negative edges. Uses a min-heap (priority queue). At each step, picks the unvisited vertex with the smallest tentative distance and relaxes its edges.",
                                    "key_points": [
                                        "Works only for non-negative weights",
                                        "Time O((V+E) log V) with binary heap",
                                        "For negative weights → use Bellman-Ford",
                                        "Real-world: Google Maps routing, network routing protocols",
                                    ],
                                    "books": ["CLRS Chapter 24"],
                                },
                            ],
                        },
                    ],
                },
                {
                    "name": "Operating Systems",
                    "chapters": [
                        {
                            "name": "Process Management",
                            "topics": [
                                {
                                    "id": "os-process",
                                    "title": "Process vs Thread",
                                    "summary": "A process is an instance of a running program with its own address space, code, data, heap and stack. A thread is a lightweight unit of execution inside a process — threads share the address space but each has its own stack and CPU registers. Context switching between threads is much cheaper than between processes.",
                                    "key_points": [
                                        "Process: heavy, isolated memory, OS-managed",
                                        "Thread: light, shared memory, IPC via shared variables",
                                        "States: New → Ready → Running → Waiting → Terminated",
                                        "PCB (Process Control Block) stores process metadata",
                                    ],
                                    "books": ["Operating System Concepts — Silberschatz", "Modern Operating Systems — Tanenbaum"],
                                },
                                {
                                    "id": "os-sched",
                                    "title": "CPU Scheduling Algorithms",
                                    "summary": "The scheduler decides which ready process runs next. FCFS (First-Come-First-Served) is simple but suffers from convoy effect. SJF (Shortest Job First) minimizes average waiting time but needs job length prediction. Round Robin gives fairness with time quantum. Priority scheduling can starve low-priority jobs unless aging is used.",
                                    "key_points": [
                                        "Metrics: turnaround, waiting, response time",
                                        "Preemptive vs non-preemptive",
                                        "Linux uses CFS (Completely Fair Scheduler)",
                                        "Windows uses multilevel feedback queue",
                                    ],
                                    "books": ["Silberschatz Chapter 6"],
                                },
                            ],
                        },
                    ],
                },
                {
                    "name": "Computer Networks",
                    "chapters": [
                        {
                            "name": "OSI & TCP/IP",
                            "topics": [
                                {
                                    "id": "net-osi",
                                    "title": "OSI 7-layer model",
                                    "summary": "The OSI reference model divides networking into 7 layers: Physical (bits on wire), Data Link (frames, MAC), Network (IP routing), Transport (TCP/UDP), Session (connections), Presentation (encryption/compression), Application (HTTP, FTP, DNS). Each layer abstracts the one below.",
                                    "key_points": [
                                        "Mnemonic: 'Please Do Not Throw Sausage Pizza Away'",
                                        "TCP/IP collapses Session+Presentation into Application",
                                        "Routers operate at Layer 3, switches at Layer 2",
                                        "TLS/SSL is technically Layer 6 (Presentation)",
                                    ],
                                    "books": ["Computer Networks — Tanenbaum", "Networking Essentials — Beasley"],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    },
    "Electronics & Communication": {
        "icon": "Radio",
        "accent": "#7F77DD",
        "diploma": {
            "duration": "3 years (after Class 10)",
            "subjects": [
                {
                    "name": "Basic Electronics",
                    "chapters": [
                        {
                            "name": "Semiconductor Devices",
                            "topics": [
                                {
                                    "id": "ec-diode",
                                    "title": "PN Junction Diode",
                                    "summary": "A PN junction forms when p-type and n-type semiconductors are joined. The depletion region creates a built-in potential of ~0.7V (Si) or 0.3V (Ge). Diodes conduct in forward bias and block in reverse bias, making them ideal for rectification (converting AC to DC), voltage clamping and signal demodulation.",
                                    "key_points": [
                                        "Forward voltage drop: 0.7V Si, 0.3V Ge",
                                        "Reverse breakdown — Zener uses this controlled",
                                        "Applications: rectifier (HW, FW, bridge), clipper, clamper",
                                        "IV curve is exponential in forward bias",
                                    ],
                                    "books": ["Electronic Devices — Floyd", "Electronic Devices & Circuits — Boylestad"],
                                },
                                {
                                    "id": "ec-bjt",
                                    "title": "Bipolar Junction Transistor (BJT)",
                                    "summary": "A BJT has three layers (NPN or PNP) and three terminals — Base (B), Collector (C), Emitter (E). Small current at Base controls large current Collector→Emitter, giving amplification. Common configurations: Common Emitter (high voltage gain), Common Base (high frequency), Common Collector (impedance matching).",
                                    "key_points": [
                                        "β (beta) = Ic/Ib, typically 50-300",
                                        "Operating regions: Cutoff, Active, Saturation",
                                        "Used in amplifiers and digital switches",
                                        "Modern alternative: MOSFETs (faster, less power)",
                                    ],
                                    "books": ["Floyd Chapter 4", "Boylestad Chapter 3"],
                                },
                            ],
                        },
                    ],
                },
                {
                    "name": "Digital Electronics",
                    "chapters": [
                        {
                            "name": "Logic Gates & Boolean Algebra",
                            "topics": [
                                {
                                    "id": "de-gates",
                                    "title": "Universal Gates — NAND & NOR",
                                    "summary": "All Boolean functions can be implemented using only NAND or only NOR gates — that's why they're called universal. AND, OR, NOT can all be derived from NAND. This is why most ICs (like 7400 series) are built around NAND/NOR for cost efficiency.",
                                    "key_points": [
                                        "AND, OR, NOT, XOR, XNOR truth tables",
                                        "NAND = NOT(AND), NOR = NOT(OR)",
                                        "Implement NOT using NAND: tie both inputs together",
                                        "De Morgan's laws simplify Boolean expressions",
                                    ],
                                    "books": ["Digital Design — Morris Mano"],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        "degree": {
            "duration": "4 years (after Class 12 with PCM)",
            "subjects": [
                {
                    "name": "Signals & Systems",
                    "chapters": [
                        {
                            "name": "LTI Systems & Convolution",
                            "topics": [
                                {
                                    "id": "ss-conv",
                                    "title": "Convolution — the heart of LTI",
                                    "summary": "Convolution computes the output of a Linear Time-Invariant (LTI) system: y(t) = x(t) * h(t) where h(t) is the impulse response. Graphically: flip, shift, multiply, integrate. Convolution in time domain equals multiplication in frequency domain — the basis of Fourier analysis and filter design.",
                                    "key_points": [
                                        "Commutative: x*h = h*x",
                                        "Discrete: y[n] = Σ x[k]·h[n-k]",
                                        "FFT computes convolution in O(N log N) vs O(N²) direct",
                                        "Used in image processing, audio filters, deep learning (CNN)",
                                    ],
                                    "books": ["Signals & Systems — Oppenheim", "Signals & Systems — Haykin"],
                                },
                            ],
                        },
                    ],
                },
                {
                    "name": "Digital Signal Processing",
                    "chapters": [
                        {
                            "name": "Fourier Transform & FFT",
                            "topics": [
                                {
                                    "id": "dsp-fft",
                                    "title": "Fast Fourier Transform (FFT)",
                                    "summary": "FFT (Cooley-Tukey 1965) computes the Discrete Fourier Transform in O(N log N) instead of O(N²). It uses divide-and-conquer: split N-point DFT into two N/2-point DFTs of even and odd samples. FFT is the engine behind audio compression (MP3), JPEG, OFDM (4G/5G/Wi-Fi), spectrum analyzers.",
                                    "key_points": [
                                        "Requires N to be power of 2 for radix-2",
                                        "Time saving: at N=1024, ~100x faster than DFT",
                                        "Butterfly diagram visualizes the algorithm",
                                        "Inverse FFT (IFFT) reconstructs time signal",
                                    ],
                                    "books": ["Digital Signal Processing — Proakis & Manolakis"],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    },
    "Mechanical": {
        "icon": "Cog",
        "accent": "#F7C97E",
        "diploma": {
            "duration": "3 years",
            "subjects": [
                {
                    "name": "Engineering Mechanics",
                    "chapters": [
                        {
                            "name": "Statics & Equilibrium",
                            "topics": [
                                {
                                    "id": "me-statics",
                                    "title": "Free Body Diagrams & Equilibrium",
                                    "summary": "A body is in equilibrium when net force AND net moment are zero: ΣF = 0 and ΣM = 0. Step 1: isolate the body. Step 2: show all external forces (gravity, normal, friction, applied loads). Step 3: solve simultaneous equations. Mastering FBDs is essential for any mechanical engineer.",
                                    "key_points": [
                                        "Three equilibrium equations in 2D: ΣFx, ΣFy, ΣM",
                                        "Friction: μN ≤ Ffriction ≤ μs·N",
                                        "Equilibrium of trusses: method of joints, method of sections",
                                        "Center of gravity, moment of inertia for compound bodies",
                                    ],
                                    "books": ["Engineering Mechanics — S. Timoshenko", "Engineering Mechanics — Hibbeler"],
                                },
                            ],
                        },
                    ],
                },
                {
                    "name": "Thermodynamics",
                    "chapters": [
                        {
                            "name": "Laws of Thermodynamics",
                            "topics": [
                                {
                                    "id": "me-thermo",
                                    "title": "First & Second Law",
                                    "summary": "First Law: energy is conserved — ΔU = Q - W. Heat added to a system increases internal energy or does work. Second Law: entropy of an isolated system never decreases — heat flows naturally from hot to cold; we need work to reverse this (refrigerator). Carnot cycle gives the upper bound on heat-engine efficiency: η_max = 1 - Tc/Th.",
                                    "key_points": [
                                        "First Law: ΔU = Q - W",
                                        "Second Law via Clausius / Kelvin-Planck statements",
                                        "Entropy S = ∫dQ/T, always increases in spontaneous processes",
                                        "Practical: heat engines, refrigerators, heat pumps",
                                    ],
                                    "books": ["Thermodynamics — P.K. Nag", "Fundamentals of Thermodynamics — Cengel"],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        "degree": {
            "duration": "4 years",
            "subjects": [
                {
                    "name": "Strength of Materials",
                    "chapters": [
                        {
                            "name": "Stress, Strain, Bending",
                            "topics": [
                                {
                                    "id": "som-stress",
                                    "title": "Stress, Strain & Hooke's Law",
                                    "summary": "Stress (σ) is force per unit area; strain (ε) is deformation per unit length. Within the elastic limit, σ = E·ε (Hooke's Law) where E is Young's Modulus. Beyond yield point, material deforms plastically and won't return to original shape. Engineers design within yield with a Factor of Safety (typically 2-4).",
                                    "key_points": [
                                        "σ = F/A (N/m² = Pa)",
                                        "ε = ΔL/L (dimensionless)",
                                        "Steel: E ≈ 200 GPa, σ_yield ≈ 250 MPa",
                                        "Stress-strain curve: elastic → yield → plastic → fracture",
                                    ],
                                    "books": ["Strength of Materials — R.K. Bansal", "Mechanics of Materials — Gere"],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    },
    "Civil": {
        "icon": "Building2",
        "accent": "#5EC4B6",
        "diploma": {
            "duration": "3 years",
            "subjects": [
                {
                    "name": "Building Construction",
                    "chapters": [
                        {
                            "name": "Foundations & Walls",
                            "topics": [
                                {
                                    "id": "ce-foundation",
                                    "title": "Types of Foundations",
                                    "summary": "Foundations transfer the load of the structure to the ground. Shallow foundations (spread, isolated, combined, raft) are used when good soil is near the surface. Deep foundations (pile, caisson, well) are used when surface soil is weak. Selection depends on soil bearing capacity, load magnitude, and water table.",
                                    "key_points": [
                                        "Shallow: spread, strip, combined, mat/raft",
                                        "Deep: end-bearing pile, friction pile, drilled shaft",
                                        "Bearing capacity (Terzaghi's equation)",
                                        "Settlement — must be uniform and within limits",
                                    ],
                                    "books": ["Building Construction — Sushil Kumar", "Soil Mechanics — Punmia"],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        "degree": {
            "duration": "4 years",
            "subjects": [
                {
                    "name": "Structural Analysis",
                    "chapters": [
                        {
                            "name": "Trusses & Beams",
                            "topics": [
                                {
                                    "id": "ce-truss",
                                    "title": "Plane Truss Analysis",
                                    "summary": "A truss is a structure of straight members connected at joints, designed to carry loads only along its members (no bending). Static determinacy: m + r = 2j (m=members, r=reactions, j=joints). Methods: Joints (resolve forces at each joint), Sections (cut and apply equilibrium to one part).",
                                    "key_points": [
                                        "Assumes pin joints, axial-only loading",
                                        "Method of Joints — iterative, all forces",
                                        "Method of Sections — direct, specific members",
                                        "Used in roof structures, bridges, towers",
                                    ],
                                    "books": ["Structural Analysis — R.C. Hibbeler", "Theory of Structures — Punmia"],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    },
    "Electrical": {
        "icon": "Zap",
        "accent": "#EF9F27",
        "diploma": {
            "duration": "3 years",
            "subjects": [
                {
                    "name": "Basic Electrical Engineering",
                    "chapters": [
                        {
                            "name": "DC Circuits",
                            "topics": [
                                {
                                    "id": "ee-ohm",
                                    "title": "Ohm's Law & Kirchhoff's Laws",
                                    "summary": "Ohm's Law: V = IR — voltage equals current times resistance. KCL (Junction Rule): sum of currents into a node = 0 (charge conservation). KVL (Loop Rule): sum of voltages around any closed loop = 0 (energy conservation). Together they solve any linear circuit.",
                                    "key_points": [
                                        "Series: R_total = R1 + R2 + ...",
                                        "Parallel: 1/R_total = 1/R1 + 1/R2 + ...",
                                        "Power: P = VI = I²R = V²/R",
                                        "Mesh analysis (KVL) and Nodal analysis (KCL) for complex circuits",
                                    ],
                                    "books": ["Basic Electrical Engineering — V.K. Mehta", "Engineering Circuit Analysis — Hayt"],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        "degree": {
            "duration": "4 years",
            "subjects": [
                {
                    "name": "Power Systems",
                    "chapters": [
                        {
                            "name": "Generation, Transmission & Distribution",
                            "topics": [
                                {
                                    "id": "ps-tx",
                                    "title": "Why high-voltage AC transmission?",
                                    "summary": "Power = V × I. For the same power, doubling voltage halves the current. Since transmission loss is I²R, halving I reduces loss to 1/4. That's why long-distance lines use 220 kV, 400 kV, 765 kV. AC is preferred over DC because of easy step-up/step-down via transformers — though modern HVDC links (800 kV+) are growing.",
                                    "key_points": [
                                        "Step-up at generator, step-down at sub-stations",
                                        "Transmission losses: I²R, corona, dielectric",
                                        "Synchronous generator, transformer, transmission line, switchgear",
                                        "Grid frequency in India: 50 Hz",
                                    ],
                                    "books": ["Power System Analysis — C.L. Wadhwa", "Electrical Power Systems — Wadhwa"],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    },
    "Chemical": {
        "icon": "FlaskConical",
        "accent": "#7F77DD",
        "degree": {
            "duration": "4 years",
            "subjects": [
                {
                    "name": "Chemical Process Calculations",
                    "chapters": [
                        {
                            "name": "Material & Energy Balances",
                            "topics": [
                                {
                                    "id": "ch-balance",
                                    "title": "Mass Balance — In = Out + Accumulation",
                                    "summary": "Mass balance is the foundation of chemical engineering: input + generation = output + accumulation + consumption. Applied to reactors, distillation columns, mixers, separators. For steady-state non-reactive processes, simply: input = output.",
                                    "key_points": [
                                        "Always draw a clearly-bounded control volume",
                                        "Choose a basis (1 kg, 1 hour, 100 mol)",
                                        "Component balances + overall balance for n unknowns",
                                        "Recycle, bypass, purge streams need careful book-keeping",
                                    ],
                                    "books": ["Stoichiometry — Bhatt & Vora", "Basic Principles — Himmelblau"],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    },
}


# ---------------------------------------------------------------------------
# Generic exam syllabus — covers all 27 exams with subjects + topics + content
# ---------------------------------------------------------------------------

# A reusable "lesson capsule" generator for exams we haven't fully detailed.
def _stub_topic(tid, title, hint, books):
    return {
        "id": tid, "title": title,
        "summary": f"{hint} Focus on conceptual clarity first, then solve at least 30 PYQs on this topic. Make a one-page revision sheet at the end of the chapter.",
        "key_points": [
            "Read NCERT / standard text once, then make notes",
            "Solve 20-30 previous-year questions on this topic",
            "Compress to a one-page revision sheet for fast review",
            "Quick-quiz yourself weekly using flashcards",
        ],
        "books": books,
    }


EXAM_SYLLABUS = {
    "UPSC-CSE": {
        "subjects": [
            {
                "name": "General Studies I — History & Geography",
                "chapters": [
                    {
                        "name": "Modern Indian History",
                        "topics": [
                            {
                                "id": "upsc-1857",
                                "title": "Revolt of 1857 — Causes & Consequences",
                                "summary": "The 1857 Sepoy Mutiny began at Meerut on 10 May 1857 and became the first large-scale uprising against British rule. Causes: political annexations (Doctrine of Lapse), economic exploitation, social-religious interference (Enfield rifle cartridges greased with cow & pig fat), and discontent in the Bengal Army. Although suppressed by 1858, it ended Company rule — power transferred to the Crown via Government of India Act 1858.",
                                "key_points": [
                                    "Trigger: greased cartridges of Enfield rifles",
                                    "Leaders: Bahadur Shah Zafar, Rani Lakshmibai, Tantia Tope, Nana Sahib, Begum Hazrat Mahal",
                                    "Centres: Meerut, Delhi, Kanpur, Lucknow, Jhansi, Bareilly",
                                    "Consequence: Company rule ended, direct Crown rule began (1858)",
                                ],
                                "books": ["Spectrum — Modern India by Rajiv Ahir", "NCERT Class 8 — Our Pasts III"],
                            },
                            _stub_topic("upsc-inc", "Formation of Indian National Congress (1885)",
                                "Founded by A.O. Hume in Bombay, INC evolved from a moderate petition body to the Mass Movement engine under Gandhiji.",
                                ["Spectrum — Modern India", "India's Struggle for Independence — Bipan Chandra"]),
                            _stub_topic("upsc-gandhi", "Gandhian Era — Non-Cooperation, Civil Disobedience, Quit India",
                                "Mahatma Gandhi led 3 major mass movements between 1920-1942 using Satyagraha and Ahimsa as his core tools.",
                                ["Bipan Chandra — Modern India", "Spectrum"]),
                        ],
                    },
                    {
                        "name": "Physical & Indian Geography",
                        "topics": [
                            _stub_topic("upsc-geo-rivers", "Indian Rivers — Himalayan & Peninsular systems",
                                "Himalayan rivers (Indus, Ganga, Brahmaputra) are snow-fed and perennial; Peninsular rivers (Krishna, Godavari, Narmada) are rain-fed and seasonal.",
                                ["NCERT Class 11 — Physical Geography", "Certificate Physical & Human Geography — G.C. Leong"]),
                            _stub_topic("upsc-geo-monsoon", "Indian Monsoon — Mechanism & Variations",
                                "Caused by differential heating of land vs sea, ITCZ shift, and Tibetan Plateau effect. SW monsoon brings 80% of rainfall.",
                                ["NCERT Class 11", "G.C. Leong"]),
                        ],
                    },
                ],
            },
            {
                "name": "General Studies II — Polity & Governance",
                "chapters": [
                    {
                        "name": "Constitution & Fundamental Rights",
                        "topics": [
                            {
                                "id": "upsc-preamble",
                                "title": "The Preamble — Soul of the Constitution",
                                "summary": "The Preamble declares India as a Sovereign, Socialist, Secular, Democratic, Republic, securing Justice, Liberty, Equality and Fraternity. 'Socialist' and 'Secular' were added by the 42nd Amendment (1976). The Supreme Court in Kesavananda Bharati (1973) held that the Preamble is part of the Constitution and reflects its basic structure.",
                                "key_points": [
                                    "Words added by 42nd Amendment: Socialist, Secular, Integrity",
                                    "Drafted by B.N. Rau and adopted 26 Nov 1949",
                                    "Berubari Union case (1960): Preamble not part of Constitution",
                                    "Kesavananda Bharati case (1973): Preamble IS part — basic structure doctrine",
                                ],
                                "books": ["Indian Polity — M. Laxmikanth (7th ed.)", "Introduction to the Constitution — D.D. Basu"],
                            },
                            _stub_topic("upsc-fr", "Fundamental Rights (Articles 12-35)",
                                "FR are justiciable rights enforceable in courts under Article 32 — Right to Equality, Freedom, against Exploitation, Religious freedom, Cultural & Educational, Constitutional Remedies.",
                                ["Laxmikanth — Polity", "D.D. Basu"]),
                            _stub_topic("upsc-dpsp", "Directive Principles of State Policy (Articles 36-51)",
                                "DPSP are non-justiciable guidelines for governance, drawn from the Irish Constitution. They aim at building a Welfare State.",
                                ["Laxmikanth — Polity"]),
                        ],
                    },
                    {
                        "name": "Union Executive",
                        "topics": [
                            _stub_topic("upsc-president", "President of India — Election, Powers, Removal",
                                "Indirectly elected by an electoral college using single-transferable vote. Holds Executive, Legislative, Financial, Judicial and Emergency powers.",
                                ["Laxmikanth"]),
                            _stub_topic("upsc-pm", "Prime Minister & Council of Ministers",
                                "PM is appointed by President from the majority party leader. Real executive power lies with PM and the Cabinet.",
                                ["Laxmikanth"]),
                        ],
                    },
                ],
            },
            {
                "name": "General Studies III — Economy, Environment, S&T",
                "chapters": [
                    {
                        "name": "Indian Economy Basics",
                        "topics": [
                            _stub_topic("upsc-gdp", "GDP, GVA, NDP — Measuring the Economy",
                                "GDP = total value of goods & services produced in a country in a year. Differences between GDP at market price / factor cost / GVA / NDP.",
                                ["Indian Economy — Ramesh Singh", "NCERT Class 12 Macroeconomics"]),
                            _stub_topic("upsc-inflation", "Inflation — Types, Causes, Remedies",
                                "WPI, CPI; demand-pull vs cost-push; RBI's monetary policy uses repo rate, reverse repo, CRR, SLR to control inflation.",
                                ["Ramesh Singh"]),
                        ],
                    },
                ],
            },
        ],
    },
    "GATE": {
        "subjects": [
            {
                "name": "Engineering Mathematics (Common to all branches)",
                "chapters": [
                    {
                        "name": "Linear Algebra",
                        "topics": [
                            {
                                "id": "gate-matrix",
                                "title": "Matrices, Determinants & Eigenvalues",
                                "summary": "A matrix is a rectangular array of numbers. Determinant tells you if a matrix is invertible (det ≠ 0). Eigenvalues λ satisfy det(A - λI) = 0; eigenvectors satisfy Av = λv. Eigen-decomposition is the basis of PCA, PageRank, vibration analysis and quantum mechanics.",
                                "key_points": [
                                    "For n×n matrix: trace = sum of eigenvalues, det = product",
                                    "Symmetric matrices have real eigenvalues + orthogonal eigenvectors",
                                    "Rank-nullity: rank + nullity = n",
                                    "Used in solving Ax=b, least-squares, transformations",
                                ],
                                "books": ["Higher Engineering Mathematics — B.S. Grewal", "Advanced Engg Maths — Erwin Kreyszig"],
                            },
                        ],
                    },
                    {
                        "name": "Calculus & Differential Equations",
                        "topics": [
                            _stub_topic("gate-ode", "Ordinary Differential Equations (1st & 2nd order)",
                                "ODEs model physical systems. Separable, linear, exact, Bernoulli, homogeneous 2nd-order with constant coefficients.",
                                ["B.S. Grewal", "Kreyszig"]),
                            _stub_topic("gate-calc", "Limits, Continuity, Derivatives, Integrals",
                                "Differentiate / integrate standard functions, Maxima-Minima, Series expansions (Taylor, Fourier), Improper integrals.",
                                ["B.S. Grewal"]),
                        ],
                    },
                ],
            },
            {
                "name": "General Aptitude",
                "chapters": [
                    {
                        "name": "Quantitative & Verbal",
                        "topics": [
                            _stub_topic("gate-quant", "Numerical Aptitude — Numbers, Ratios, Percentages",
                                "Quick mental-math techniques save 10-15 minutes in the GA section. Practice with RS Aggarwal Quantitative Aptitude.",
                                ["Quantitative Aptitude — R.S. Aggarwal"]),
                            _stub_topic("gate-verbal", "English Grammar, Reading Comprehension, Verbal Reasoning",
                                "Spotting grammatical errors, sentence completion, RC inferences. Vocabulary from Word Power Made Easy.",
                                ["Word Power Made Easy — Norman Lewis"]),
                        ],
                    },
                ],
            },
        ],
    },
    "MPSC-RAJYA": {
        "subjects": [
            {
                "name": "Maharashtra-specific History & Geography",
                "chapters": [
                    {
                        "name": "Adhunik Maharashtracha Itihas",
                        "topics": [
                            _stub_topic("mpsc-samaj", "Samaj-Sudhar Chalwal (Social Reform Movements)",
                                "Mahatma Phule, Savitribai Phule, Dr. B.R. Ambedkar — their writings, sangathana, and lasting impact on caste and education reform in Maharashtra.",
                                ["Adhunik Maharashtra cha Itihas — Anil Kathare", "Balbharati Std 11-12 (Marathi)"]),
                            _stub_topic("mpsc-shivaji", "Chhatrapati Shivaji Maharaj — Swarajya Sthapan",
                                "Birth at Shivneri (1630), Adilshahi resistance, Afzal Khan vadh, Treaty of Purandar, Coronation 1674.",
                                ["Riyasat — Setumadhavrao Pagdi", "Balbharati"]),
                        ],
                    },
                    {
                        "name": "Maharashtracha Bhugol",
                        "topics": [
                            _stub_topic("mpsc-rivers", "Maharashtratil Pramukha Nadi Khore",
                                "Godavari, Krishna, Bhima, Tapi — uggam, prawah, mahatva pikache shetra & dharne.",
                                ["Maharashtra Bhugol — A.B. Savadi"]),
                        ],
                    },
                ],
            },
            {
                "name": "Indian Polity (Marathi medium friendly)",
                "chapters": [
                    {
                        "name": "Bhartiya Rajyaghatna",
                        "topics": [
                            _stub_topic("mpsc-poli", "Mulbhoot Hakka aani DPSP",
                                "Article 14 te 32 mulbhoot hakka; DPSP article 36 te 51 — rajyache margdarshak tatve.",
                                ["Indian Polity — Laxmikanth (English/Marathi version)", "Bharatachi Rajyaghatna — V.B. Patil"]),
                        ],
                    },
                ],
            },
        ],
    },
    "IAF-AFCAT": {
        "subjects": [
            {
                "name": "Aptitude & Reasoning",
                "chapters": [
                    {
                        "name": "Numerical & Verbal Aptitude",
                        "topics": [
                            _stub_topic("afcat-quant", "Number System, Percentages, Time-Speed-Distance",
                                "Practise 30 questions daily. Focus on shortcuts for percentages and TSD-based aviation problems (relative speed of aircraft).",
                                ["AFCAT — Arihant", "Quantitative Aptitude — R.S. Aggarwal"]),
                            _stub_topic("afcat-reasoning", "Verbal & Non-verbal Reasoning",
                                "Coding-decoding, series, analogy, syllogism, mirror images, paper folding.",
                                ["Verbal Reasoning — R.S. Aggarwal"]),
                        ],
                    },
                ],
            },
            {
                "name": "Military & Defence Awareness",
                "chapters": [
                    {
                        "name": "Indian Armed Forces",
                        "topics": [
                            _stub_topic("afcat-iaf-history", "History of Indian Air Force",
                                "Formed 1932 as Royal Indian Air Force; Independence 1947, prefix dropped 1950. Key wars: 1965, 1971, Kargil 1999, Balakot 2019.",
                                ["AFCAT — Arihant"]),
                            _stub_topic("afcat-defence-news", "Recent Defence Acquisitions & Operations",
                                "Rafale induction, S-400 deal, Light Combat Aircraft (Tejas), Apache, Chinook, indigenous Astra missile.",
                                ["The Hindu Defence pages", "Sansad TV defence shows"]),
                        ],
                    },
                ],
            },
        ],
    },
    "ARMY-TGC": {
        "subjects": [
            {
                "name": "SSB Interview Prep",
                "chapters": [
                    {
                        "name": "Officer-Like Qualities (OLQs)",
                        "topics": [
                            _stub_topic("army-olq", "The 15 OLQs Decoded",
                                "Effective Intelligence, Reasoning Ability, Organising Ability, Power of Expression, Social Adaptability, Cooperation, Sense of Responsibility, Initiative, Self-Confidence, Speed of Decision, Ability to Influence the Group, Liveliness, Determination, Courage, Stamina.",
                                ["Let Us Crack SSB Interview — Maj Gen N. Bhojwani", "SSB Cracker — N.K. Natarajan"]),
                            _stub_topic("army-ppdt", "PPDT — Picture Perception & Discussion Test",
                                "Day-1 screening: see a hazy picture, write a story in 4 min, narrate in 1 min, then group discussion to arrive at common story.",
                                ["SSB Cracker", "OIR & PPDT — Arihant"]),
                        ],
                    },
                ],
            },
        ],
    },

    # ---------- UPSC family ----------
    "UPSC-CDS": {
        "subjects": [
            {
                "name": "Elementary Mathematics",
                "chapters": [
                    {"name": "Arithmetic", "topics": [
                        _stub_topic("cds-num", "Number system, HCF/LCM, ratios, percentages",
                            "Master Class 10 NCERT arithmetic. Time-saving tricks for CDS Maths — 100 Q in 120 min.",
                            ["NCERT Maths Class 10", "Pathfinder CDS — Arihant"]),
                        _stub_topic("cds-tsd", "Time, Speed, Distance & Work",
                            "Relative speed, trains, boats, pipes & cisterns — appear every cycle.",
                            ["R.S. Aggarwal Quantitative Aptitude"]),
                    ]},
                    {"name": "Geometry & Trigonometry", "topics": [
                        _stub_topic("cds-geo", "Lines, triangles, circles, mensuration",
                            "Class 10 Geometry + 2D/3D mensuration formulas. Avg 12-15 questions in Maths paper.",
                            ["NCERT Geometry", "Pathfinder CDS"]),
                        _stub_topic("cds-trig", "Heights, distances, trigonometric ratios",
                            "Standard angles, identities, height & distance word problems.",
                            ["NCERT Class 10 Trigonometry"]),
                    ]},
                ],
            },
            {
                "name": "English",
                "chapters": [
                    {"name": "Grammar & Vocabulary", "topics": [
                        _stub_topic("cds-eng", "Spotting errors, sentence improvement, idioms",
                            "30-35 grammar questions per paper. Build vocabulary from Word Power Made Easy.",
                            ["Word Power Made Easy — Norman Lewis", "Wren & Martin"]),
                        _stub_topic("cds-rc", "Reading comprehension passages",
                            "Skim, scan, then deep-read. Practice editorial-style passages.",
                            ["The Hindu Editorial", "Pathfinder CDS"]),
                    ]},
                ],
            },
            {
                "name": "General Knowledge",
                "chapters": [
                    {"name": "Static + Current Affairs", "topics": [
                        _stub_topic("cds-gk", "Indian History, Polity, Geography, Economy",
                            "Lucent + NCERTs is the baseline. Last 1 year current affairs heavily tested.",
                            ["Lucent's GK", "Manorama Yearbook"]),
                        _stub_topic("cds-def", "Defence-specific GK",
                            "Indian Armed Forces structure, ranks, recent wars, modern equipment.",
                            ["Pathfinder CDS — Arihant"]),
                    ]},
                ],
            },
        ],
    },

    "UPSC-ESE": {
        "subjects": [
            {
                "name": "General Studies & Engineering Aptitude (Paper I)",
                "chapters": [
                    {"name": "Current Issues & Engg Aptitude", "topics": [
                        _stub_topic("ese-curr", "National/International current affairs, S&T",
                            "Focus on infrastructure, atomic energy, space, defence tech. 12-month window.",
                            ["The Hindu", "Vision IAS Monthly", "Made Easy GS+Aptitude"]),
                        _stub_topic("ese-eth", "Engineering Ethics, Society & Environment",
                            "Code of conduct, environmental ethics, sustainability principles.",
                            ["Made Easy Engg Ethics book"]),
                    ]},
                ],
            },
            {
                "name": "Stream Technical (CE/ME/EE/EC)",
                "chapters": [
                    {"name": "Core subjects (per stream)", "topics": [
                        _stub_topic("ese-tech1", "GATE-level concepts + conventional questions",
                            "Cover GATE syllabus fully, then add ESE-only topics. Conventional paper needs answer writing.",
                            ["Made Easy / IES Master postal", "Stream standard texts"]),
                        _stub_topic("ese-tech2", "Conventional paper answer-writing",
                            "Write structured answers with diagrams and free-body diagrams. 2 questions/day with timer.",
                            ["IES Master conventional papers"]),
                    ]},
                ],
            },
        ],
    },

    "UPSC-CAPF": {
        "subjects": [
            {
                "name": "Paper I — General Ability & Intelligence",
                "chapters": [
                    {"name": "GS subjects", "topics": [
                        _stub_topic("capf-gs", "History, Polity, Geography, Economy, S&T",
                            "Same standard as UPSC Prelims but lighter optional load. NCERT + standard books.",
                            ["NCERTs", "Laxmikanth — Polity", "Spectrum — Modern India"]),
                        _stub_topic("capf-ca", "Current Affairs (last 1 year)",
                            "National & international affairs, internal security focus.",
                            ["The Hindu", "Drishti IAS Monthly"]),
                    ]},
                ],
            },
            {
                "name": "Paper II — Essay, Comprehension & Communication",
                "chapters": [
                    {"name": "Writing skills", "topics": [
                        _stub_topic("capf-essay", "Essay writing (English/Hindi)",
                            "1 essay/week, 800 words, 60 min. Structure: intro → arguments → counter → conclusion.",
                            ["Manorama Yearbook", "Past CAPF essay topics"]),
                        _stub_topic("capf-pet", "PET preparation (parallel)",
                            "100m sprint, 800m run, long jump, shot put. Daily 3 km run + bodyweight training.",
                            ["NCC Physical Training Manual"]),
                    ]},
                ],
            },
        ],
    },

    "UPSC-NDA": {
        "subjects": [
            {
                "name": "Mathematics (Class 11-12)",
                "chapters": [
                    {"name": "Algebra, Calculus, Vector", "topics": [
                        _stub_topic("nda-algebra", "Sets, complex numbers, sequences & series, matrices",
                            "NCERT cover-to-cover, then RD Sharma for tougher problems.",
                            ["NCERT Class 11-12", "RD Sharma", "Pathfinder NDA — Arihant"]),
                        _stub_topic("nda-calc", "Differential & integral calculus",
                            "Limits, derivatives, applications, integration techniques. ~25 Qs in Paper I.",
                            ["NCERT Class 12 Calculus"]),
                    ]},
                    {"name": "Trigonometry & Coordinate Geometry", "topics": [
                        _stub_topic("nda-trig", "Trig ratios, identities, heights & distances",
                            "Memorize standard angles, identities and proofs. ~10 Qs.",
                            ["NCERT Trigonometry"]),
                    ]},
                ],
            },
            {
                "name": "General Ability Test (GAT)",
                "chapters": [
                    {"name": "Physics & Chemistry (Class 11-12)", "topics": [
                        _stub_topic("nda-phy", "Mechanics, optics, electricity, modern physics",
                            "NCERT + Pradeep's objective. Focus on numerical-heavy topics.",
                            ["NCERT Class 11-12 Physics"]),
                        _stub_topic("nda-chem", "Inorganic, Organic, Physical chemistry basics",
                            "Periodic table, bonding, organic functional groups, equilibrium.",
                            ["NCERT Class 11-12 Chemistry"]),
                    ]},
                    {"name": "English & GK", "topics": [
                        _stub_topic("nda-eng", "Grammar, vocabulary, comprehension",
                            "Word Power Made Easy + daily editorial reading.",
                            ["Word Power Made Easy", "Wren & Martin"]),
                    ]},
                ],
            },
        ],
    },

    "UPSC-CMS": {
        "subjects": [
            {
                "name": "Paper I — General Medicine & Paediatrics",
                "chapters": [
                    {"name": "General Medicine", "topics": [
                        _stub_topic("cms-med", "Cardiology, Endocrinology, Infectious diseases",
                            "Marrow/PrepLadder MCQs daily. Focus on high-yield topics for CMS pattern.",
                            ["Marrow / PrepLadder", "Davidson's Principles"]),
                        _stub_topic("cms-paeds", "Paediatrics — common diseases & vaccines",
                            "IAP immunisation schedule, paediatric milestones, nutrition.",
                            ["Ghai Essential Paediatrics"]),
                    ]},
                ],
            },
            {
                "name": "Paper II — Surgery, OBG, PSM",
                "chapters": [
                    {"name": "Surgery + OBG", "topics": [
                        _stub_topic("cms-surg", "General Surgery basics",
                            "Bailey for quick revision. Trauma, sepsis, surgical anatomy.",
                            ["Bailey & Love"]),
                        _stub_topic("cms-obg", "Obstetrics & Gynaecology",
                            "Antenatal care, labour, contraception, common gynae issues.",
                            ["DC Dutta — OBG"]),
                    ]},
                    {"name": "Preventive & Social Medicine", "topics": [
                        _stub_topic("cms-psm", "Epidemiology, communicable disease control, national health programs",
                            "PSM carries highest weightage — revise Park's textbook 2-3 times.",
                            ["Park's PSM"]),
                    ]},
                ],
            },
        ],
    },

    "UPSC-IFOS": {
        "subjects": [
            {
                "name": "Mains Optional Subjects",
                "chapters": [
                    {"name": "Forestry / Agriculture", "topics": [
                        _stub_topic("ifos-for", "Silviculture, forest management, forest economics",
                            "Indian Forestry — S.S. Negi is the bible. Map every chapter to PYQs.",
                            ["Manual of Indian Forestry — S.S. Negi"]),
                        _stub_topic("ifos-agri", "Agronomy, soil science, agricultural economics",
                            "ICAR books + standard agriculture textbooks.",
                            ["Agronomy — ICAR", "Soil Science — Brady"]),
                    ]},
                    {"name": "Zoology / Botany / Geology", "topics": [
                        _stub_topic("ifos-bot", "Plant taxonomy, ecology, physiology",
                            "Choose this if you have a botany/biology background.",
                            ["Pandey textbook of Botany"]),
                    ]},
                ],
            },
            {
                "name": "GS Mains (same as CSE)",
                "chapters": [
                    {"name": "Environment Focus", "topics": [
                        _stub_topic("ifos-env", "Forestry policy, Wildlife Protection Act, biodiversity",
                            "Map every news item to relevant act/policy. Read ICFRE reports.",
                            ["Shankar IAS — Environment", "ICFRE Annual Reports"]),
                    ]},
                ],
            },
        ],
    },

    # ---------- MPSC family ----------
    "MPSC-GROUPB": {
        "subjects": [
            {
                "name": "Marathi & English",
                "chapters": [
                    {"name": "Vyakaran (Grammar)", "topics": [
                        _stub_topic("gb-marathi", "Marathi grammar — sandhi, samas, vibhakti, alankar",
                            "Daily 30 min of Adhikari Marathi grammar. PSI/STI/ASO pattern unchanged.",
                            ["Adhikari — Marathi Vyakaran"]),
                        _stub_topic("gb-eng", "English grammar — error spotting, comprehension",
                            "Wren & Martin + daily English newspaper.",
                            ["Wren & Martin", "Norman Lewis"]),
                    ]},
                ],
            },
            {
                "name": "General Knowledge",
                "chapters": [
                    {"name": "Maharashtra GK + Static", "topics": [
                        _stub_topic("gb-mhgk", "Maharashtra geography, history, polity",
                            "Maharashtra Year Book is mandatory.",
                            ["Maharashtra Year Book", "Loksatta"]),
                        _stub_topic("gb-ind", "Indian Constitution basics, Indian history",
                            "Laxmikanth (Marathi/English) + Spectrum Modern India.",
                            ["Laxmikanth", "Spectrum"]),
                    ]},
                ],
            },
            {
                "name": "Quantitative Aptitude & Reasoning",
                "chapters": [
                    {"name": "Speed solving", "topics": [
                        _stub_topic("gb-quant", "Arithmetic, ratios, percentages, profit-loss",
                            "100 Q in 60 min — practice with timer daily.",
                            ["R.S. Aggarwal Quantitative Aptitude"]),
                        _stub_topic("gb-reason", "Coding-decoding, blood relations, series, syllogism",
                            "Verbal + non-verbal reasoning. Practice 30 Qs daily.",
                            ["R.S. Aggarwal Reasoning"]),
                    ]},
                ],
            },
        ],
    },

    "MPSC-GROUPC": {
        "subjects": [
            {
                "name": "Language Papers",
                "chapters": [
                    {"name": "Typing skills", "topics": [
                        _stub_topic("gc-typing", "Marathi typing 30 wpm, English typing 40 wpm",
                            "Daily 30 min typing practice — TypingMaster software helps.",
                            ["TypingMaster software"]),
                        _stub_topic("gc-marathi", "Marathi & English grammar basics",
                            "Adhikari + Wren & Martin sufficient.",
                            ["Adhikari", "Wren & Martin"]),
                    ]},
                ],
            },
            {
                "name": "GK + Maths",
                "chapters": [
                    {"name": "Basic concepts", "topics": [
                        _stub_topic("gc-math", "Class 10 arithmetic, percentages, simple algebra",
                            "Stick to fundamentals. No need for advanced topics.",
                            ["NCERT Class 10 Maths"]),
                        _stub_topic("gc-mhgk", "Maharashtra-specific GK + Indian Constitution basics",
                            "Maharashtra Sansari is a focused resource.",
                            ["Maharashtra Sansari", "K-Sagar Group C"]),
                    ]},
                ],
            },
        ],
    },

    "MPSC-TECH": {
        "subjects": [
            {
                "name": "Stream Technical",
                "chapters": [
                    {"name": "Core Engineering", "topics": [
                        _stub_topic("mt-core", "Civil / Mech / Electrical core subjects",
                            "GATE-level depth. Made Easy postal notes are gold-standard.",
                            ["Made Easy postal", "Engineering Mathematics — B.S. Grewal"]),
                        _stub_topic("mt-pyq", "Last 10y MPSC Technical PYQs",
                            "Map question patterns; many topics repeat verbatim.",
                            ["K-Sagar MPSC Technical PYQ"]),
                    ]},
                ],
            },
            {
                "name": "GS (Maharashtra focus)",
                "chapters": [
                    {"name": "MH-specific GS", "topics": [
                        _stub_topic("mt-mhgs", "Maharashtra geography, polity & current affairs",
                            "Same as Rajyaseva but reduced depth.",
                            ["K-Sagar GS", "Maharashtra Year Book"]),
                    ]},
                ],
            },
        ],
    },

    "MPSC-SUB": {
        "subjects": [
            {
                "name": "Marathi & English Language",
                "chapters": [
                    {"name": "Grammar", "topics": [
                        _stub_topic("ms-lang", "Marathi/English grammar + vocabulary",
                            "Daily 1 hr grammar drill. Vocabulary via newspaper.",
                            ["Adhikari", "Wren & Martin"]),
                    ]},
                ],
            },
            {
                "name": "GK + Aptitude",
                "chapters": [
                    {"name": "Current Affairs + Aptitude", "topics": [
                        _stub_topic("ms-ca", "Maharashtra-focused current affairs (last 1 yr)",
                            "Loksatta editorials + Maharashtra Year Book.",
                            ["Loksatta", "Maharashtra Year Book"]),
                        _stub_topic("ms-quant", "Quantitative Aptitude basics",
                            "Class 10 arithmetic; ratios; percentages; D-I.",
                            ["R.S. Aggarwal Quant"]),
                    ]},
                ],
            },
        ],
    },

    # ---------- IAF ----------
    "IAF-FTS": {
        "subjects": [
            {
                "name": "SSB Interview (Direct Entry)",
                "chapters": [
                    {"name": "5-Stage SSB Process", "topics": [
                        _stub_topic("fts-ssb1", "Day 1 — Screening (OIR + PPDT)",
                            "Officer Intelligence Rating tests + Picture Perception Discussion Test.",
                            ["SSB Cracker — N.K. Natarajan"]),
                        _stub_topic("fts-ssb2", "Days 2-4 — Psychology + GTO + Personal Interview",
                            "TAT, WAT, SRT, SD + Group Discussion + Group Tasks + PI.",
                            ["Let Us Crack SSB Interview"]),
                    ]},
                ],
            },
            {
                "name": "Aviation Awareness",
                "chapters": [
                    {"name": "IAF Knowledge", "topics": [
                        _stub_topic("fts-iaf", "IAF history, ranks, modern aircraft, ongoing operations",
                            "Rafale, Tejas, Sukhoi-30, S-400, recent exercises.",
                            ["Aviation Week magazine", "IAF website"]),
                    ]},
                ],
            },
        ],
    },

    "IAF-NCC": {
        "subjects": [
            {
                "name": "SSB Preparation",
                "chapters": [
                    {"name": "OLQs & GTO", "topics": [
                        _stub_topic("ncc-iaf-olq", "Officer-Like Qualities + group tasks",
                            "Same 15 OLQs framework — apply via NCC HQ during final year.",
                            ["SSB Cracker"]),
                        _stub_topic("ncc-iaf-pabt", "Pilot Aptitude Battery Test (for flying branch)",
                            "Hand-eye coordination, multitasking — practice flight-sim apps.",
                            ["PABT preparation — Arihant"]),
                    ]},
                ],
            },
        ],
    },

    "IAF-MET": {
        "subjects": [
            {
                "name": "AFCAT + EKT Met",
                "chapters": [
                    {"name": "AFCAT prep", "topics": [
                        _stub_topic("met-afcat", "Same as AFCAT officer entry preparation",
                            "Aptitude + Verbal + GK + Reasoning.",
                            ["AFCAT — Arihant"]),
                    ]},
                    {"name": "Meteorology basics", "topics": [
                        _stub_topic("met-atm", "Atmospheric science, weather systems, climatology",
                            "Wallace & Hobbs — standard university textbook.",
                            ["Atmospheric Science — Wallace & Hobbs"]),
                        _stub_topic("met-prac", "Practical Meteorology — data interpretation",
                            "Surface charts, radiosondes, satellite imagery basics.",
                            ["IMD training manuals"]),
                    ]},
                ],
            },
        ],
    },

    # ---------- Indian Army (rest) ----------
    "ARMY-SSCT": {
        "subjects": [
            {
                "name": "SSB Interview",
                "chapters": [
                    {"name": "5-stage SSB", "topics": [
                        _stub_topic("ssct-ssb", "Screening, Psychology, GTO, PI, Conference",
                            "Direct SSB after engineering % shortlist. No written exam.",
                            ["Let Us Crack SSB Interview"]),
                        _stub_topic("ssct-olq", "Officer-Like Qualities development",
                            "Build through college NCC, sports, leadership roles, debate club.",
                            ["SSB Cracker"]),
                    ]},
                ],
            },
            {
                "name": "Physical Fitness",
                "chapters": [
                    {"name": "Endurance & strength", "topics": [
                        _stub_topic("ssct-fit", "2.4 km run < 12 min, push-ups, sit-ups",
                            "Train 4-5 days/week. Mix HIIT + strength + flexibility.",
                            ["Indian Army Physical Training Manual"]),
                    ]},
                ],
            },
        ],
    },

    "ARMY-JAG": {
        "subjects": [
            {
                "name": "Law Subjects",
                "chapters": [
                    {"name": "Constitution & Major Acts", "topics": [
                        _stub_topic("jag-cons", "Constitutional law — fundamental rights, separation of powers",
                            "Bare Act revision + landmark judgements (Kesavananda, Maneka Gandhi).",
                            ["Bare Act — Constitution", "DD Basu"]),
                        _stub_topic("jag-ipc", "IPC, CrPC, Evidence Act overview",
                            "Focus on critical sections relevant to military law.",
                            ["IPC Bare Act", "CrPC by Ratanlal"]),
                    ]},
                    {"name": "Military Law", "topics": [
                        _stub_topic("jag-mil", "Army Act 1950 — basics for JAG officers",
                            "Court-martial structure, military offences.",
                            ["Army Act 1950 (Bare Act)"]),
                    ]},
                ],
            },
            {
                "name": "SSB Interview Prep",
                "chapters": [
                    {"name": "OLQs + Legal scenarios", "topics": [
                        _stub_topic("jag-ssb", "Legal current affairs + general SSB process",
                            "Landmark cases + recent judgements + group discussion.",
                            ["The Hindu Legal columns", "SSB Cracker"]),
                    ]},
                ],
            },
        ],
    },

    "ARMY-NCC": {
        "subjects": [
            {
                "name": "SSB Process",
                "chapters": [
                    {"name": "OLQ Development", "topics": [
                        _stub_topic("anc-olq", "15 OLQs + 5-stage SSB",
                            "Apply via your NCC unit. No written exam.",
                            ["NCC Cadet Handbook", "SSB Cracker"]),
                        _stub_topic("anc-public", "Public speaking & leadership",
                            "Debate, drill, command — leverage NCC experience.",
                            ["Public Speaking — Dale Carnegie"]),
                    ]},
                ],
            },
        ],
    },

    # ---------- Engineering (PSU & Diploma) ----------
    "ISRO-SC": {
        "subjects": [
            {
                "name": "Stream Core (EC/CS/ME)",
                "chapters": [
                    {"name": "Core technical (per stream)", "topics": [
                        _stub_topic("isro-ec", "EC — Signals, Digital, Communication, Control Systems",
                            "GATE-level depth. ISRO PYQ patterns favour communication & control.",
                            ["GATE EC — Made Easy", "ISRO PYQs 10 years"]),
                        _stub_topic("isro-cs", "CS — OS, DBMS, Algorithms, Networks",
                            "Same as GATE CS syllabus.",
                            ["GATE CS — Made Easy"]),
                    ]},
                    {"name": "Aerospace orientation", "topics": [
                        _stub_topic("isro-aero", "Basics of aerospace, satellites, propulsion",
                            "Skim John D. Anderson + ISRO mission briefs.",
                            ["Introduction to Flight — Anderson"]),
                    ]},
                ],
            },
            {
                "name": "Interview Prep",
                "chapters": [
                    {"name": "Project + Technical Viva", "topics": [
                        _stub_topic("isro-int", "Explain B.Tech project clearly & deeply",
                            "Be ready for fundamentals from final-year project. Mock interviews help.",
                            ["Project Diary", "ISRO Annual Report"]),
                    ]},
                ],
            },
        ],
    },

    "BARC-OCES": {
        "subjects": [
            {
                "name": "Stream Core",
                "chapters": [
                    {"name": "Stream-specific (Mech / Chem / Elec / Met / CS / Civil)", "topics": [
                        _stub_topic("barc-core", "GATE syllabus + BARC PYQs",
                            "BARC asks fundamentals deeper than GATE. 15 years PYQs are gold.",
                            ["Made Easy / IES Master", "BARC PYQs compilation"]),
                        _stub_topic("barc-nuc", "Nuclear engineering basics",
                            "Lamarsh — chapters on reactor physics, neutron diffusion.",
                            ["Nuclear Reactor Engineering — Lamarsh"]),
                    ]},
                ],
            },
            {
                "name": "Interview",
                "chapters": [
                    {"name": "Technical Viva", "topics": [
                        _stub_topic("barc-int", "Atomic energy current affairs + project deep-dive",
                            "Be ready: Kalpakkam, Tarapur, KAPS, Apsara, IFR program.",
                            ["DAE Annual Report"]),
                    ]},
                ],
            },
        ],
    },

    "DRDO-SET": {
        "subjects": [
            {
                "name": "Stream Core",
                "chapters": [
                    {"name": "Stream subjects + GA + Maths", "topics": [
                        _stub_topic("drdo-core", "Aerospace/EC/ME/CS — GATE depth",
                            "GATE prep + DRDO-specific PYQs of last 10 years.",
                            ["Made Easy stream books", "DRDO PYQs"]),
                        _stub_topic("drdo-tech", "Defence technology awareness",
                            "Missiles (Astra, Akash, Agni), radars, drones, EW systems.",
                            ["Defence News digests", "DRDO Newsletter"]),
                    ]},
                ],
            },
            {
                "name": "Interview",
                "chapters": [
                    {"name": "Project + Viva", "topics": [
                        _stub_topic("drdo-int", "Final-year project + fundamental viva",
                            "DRDO favours candidates with strong project & research aptitude.",
                            ["DRDO Project Portfolio"]),
                    ]},
                ],
            },
        ],
    },

    "SSC-JE": {
        "subjects": [
            {
                "name": "Technical Stream (CE / ME / EE)",
                "chapters": [
                    {"name": "Stream-wise core", "topics": [
                        _stub_topic("ssc-je-tech", "Civil/Mech/Electrical Diploma + BE subjects",
                            "Cover Diploma syllabus first; layer BE topics. Made Easy postal helps.",
                            ["Made Easy SSC JE", "RS Khurmi / BC Punmia / V.K. Mehta"]),
                        _stub_topic("ssc-je-conv", "Paper II Conventional answer-writing",
                            "Long-form questions with figures. 2 questions/day with timer.",
                            ["Made Easy Conventional"]),
                    ]},
                ],
            },
            {
                "name": "General Intelligence & Reasoning",
                "chapters": [
                    {"name": "Reasoning + GA", "topics": [
                        _stub_topic("ssc-je-rea", "Verbal & non-verbal reasoning",
                            "Coding, series, analogy, syllogism, mirror images.",
                            ["RS Aggarwal Verbal & Non-verbal Reasoning"]),
                        _stub_topic("ssc-je-ga", "General Awareness — last 1 year + static",
                            "Indian polity, history, geography basics.",
                            ["Lucent GK", "Manorama Yearbook"]),
                    ]},
                ],
            },
        ],
    },

    "STATE-AE-JE": {
        "subjects": [
            {
                "name": "Stream Technical",
                "chapters": [
                    {"name": "State-specific syllabus", "topics": [
                        _stub_topic("sae-tech", "Civil / Mech / Electrical stream depth",
                            "Made Easy + IES Master + state PSC PYQs (10+ years).",
                            ["Made Easy stream books", "State PSC PYQs"]),
                        _stub_topic("sae-conv", "Conventional Paper writing",
                            "State boards focus on stream depth; sketches earn marks.",
                            ["IES Master Conventional"]),
                    ]},
                ],
            },
            {
                "name": "GS + Language",
                "chapters": [
                    {"name": "Regional GS", "topics": [
                        _stub_topic("sae-gs", "State-specific geography, history, polity",
                            "State Year Book + regional newspaper.",
                            ["State Year Book", "Manorama"]),
                    ]},
                ],
            },
        ],
    },

    "ENG-DIPLOMA": {
        "subjects": [
            {
                "name": "Mathematics & Science (Class 10 NCERT)",
                "chapters": [
                    {"name": "Mathematics", "topics": [
                        _stub_topic("dip-math", "Algebra, Geometry, Mensuration",
                            "Polytechnic entrance is Class 10-level — focus on speed accuracy.",
                            ["NCERT Maths Class 10", "Arihant JEECUP / DET / CEEP"]),
                        _stub_topic("dip-mensur", "Mensuration formulas + word problems",
                            "Square, rectangle, triangle, circle, cylinder, cone formulas memorized.",
                            ["NCERT"]),
                    ]},
                    {"name": "Physics & Chemistry", "topics": [
                        _stub_topic("dip-phy", "Motion, force, electricity, light, sound",
                            "NCERT Class 10 Physics covers all entrance topics.",
                            ["NCERT Class 10 Physics"]),
                        _stub_topic("dip-chem", "Acids-bases, metals-nonmetals, carbon compounds",
                            "Conceptual chemistry questions are common.",
                            ["NCERT Class 10 Chemistry"]),
                    ]},
                ],
            },
            {
                "name": "English & Logical Reasoning",
                "chapters": [
                    {"name": "Language + Reasoning", "topics": [
                        _stub_topic("dip-eng", "Grammar, comprehension, vocabulary",
                            "Wren & Martin basics + daily reading.",
                            ["Wren & Martin"]),
                        _stub_topic("dip-reason", "Number series, analogy, coding-decoding",
                            "20-30 reasoning Qs per polytechnic entrance.",
                            ["RS Aggarwal Reasoning"]),
                    ]},
                ],
            },
            {
                "name": "State-specific GK",
                "chapters": [
                    {"name": "Awareness", "topics": [
                        _stub_topic("dip-gk", "State geography, history, civics basics",
                            "State board Class 8-10 social science books.",
                            ["State board books", "Lucent GK"]),
                    ]},
                ],
            },
        ],
    },
}


# Helper: full syllabus for an exam (returns structured tree)
def syllabus_for(code: str):
    return EXAM_SYLLABUS.get(code.upper())
