const dayCurrent = document.querySelector(".day-current");

let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();
const dayOfWeek = date.getDay();

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const currentTimeElement = document.querySelector(".current-time");
const renderCurrentTime = () => {
    currentTimeElement.innerHTML = `${days[dayOfWeek]}, ${months[currentMonth]} ${date.getDate()}`;
};
renderCurrentTime();

const renderDays = () => {
    let liTags = "";
    // First day and last date of the current month
    let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    let lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate();

    dayCurrent.innerHTML = `${months[currentMonth]} ${currentYear}`;

    // Show days from the previous month
    for (let i = firstDayOfMonth; i > 0; i--) {
        liTags += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
    }

    // Show days of the current month
    for (let i = 1; i <= lastDateOfMonth; i++) {
        let isToday =
            i === date.getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()
                ? "active"
                : "";
        liTags += `<li class="${isToday}">${i}</li>`;
    }

    // Show days of the next month to reach 64 total days
    let nextDaysCount = 42 - (firstDayOfMonth + lastDateOfMonth);
    for (let i = 1; i <= nextDaysCount; i++) {
        liTags += `<li class="inactive">${i}</li>`;
    }

    // Insert liTags into the .days element
    document.querySelector(".days").innerHTML = liTags;

    //
    const dayElement = document.querySelectorAll(".days li");
    dayElement.forEach((item) => {
        item.addEventListener("click", () => {
            dayElement.forEach((el) => el.classList.remove("selected"));
            item.classList.add("selected");
        });
    });

    // Hidden
    document.querySelector(".day-current").addEventListener("click", () => {
        document.querySelector("#wrapper-day").style.display = "none";
        document.querySelector("#wrapper-month").style.display = "block";
    });
};

renderDays();

const preNextIcon = document.querySelectorAll(".icons-days span");
preNextIcon.forEach((icon) => {
    icon.addEventListener("click", () => {
        currentMonth = icon.id === "prev" ? currentMonth - 1 : currentMonth + 1;
        if (currentMonth < 0 || currentMonth > 11) {
            date = new Date(currentYear, currentMonth);
            currentMonth = date.getMonth();
            currentYear = date.getFullYear();
        } else {
            date = new Date();
        }
        renderDays();
    });
});

currentTimeElement.addEventListener("click", () => {
    document.querySelector("#wrapper-day").style.display = "block";
    document.querySelector("#wrapper-month").style.display = "none";
    document.querySelector("#wrapper-year").style.display = "none";
});

document.querySelector(".days").addEventListener("wheel", (event) => {
    console.log({ event });

    if (event.deltaY < 0) {
        // Cuộn lên để về tháng trước
        currentMonth -= 1;
    } else {
        // Cuộn xuống để qua tháng sau
        currentMonth += 1;
    }

    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear -= 1;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear += 1;
    }

    renderDays();
    event.preventDefault(); // Ngăn chặn cuộn trang mặc định
});

// ----------------------------RENDER MONTH---------------------------------

const renderMonth = () => {
    const monthCurrentElement = document.querySelector(".month-current");
    const monthElements = document.querySelector(".months");

    monthCurrentElement.innerHTML = currentYear;
    let monthsTags = "";

    // Hiển thị 12 tháng của năm hiện tại
    for (let i = 0; i < 12; i++) {
        let activeMonth = i === new Date().getMonth() && currentYear === new Date().getFullYear() ? "active" : "";
        monthsTags += `<li data-month="${i}" data-year="${currentYear}" class="${activeMonth}">${months[i].slice(
            0,
            3
        )}</li>`;
    }

    // Hiển thị 4 tháng đầu của năm sau
    const nextYear = currentYear + 1;
    for (let i = 0; i < 4; i++) {
        monthsTags += `<li data-month="${i}" data-year="${nextYear}" class="inactive">${months[i].slice(0, 3)}</li>`;
    }

    monthElements.innerHTML = monthsTags;

    document.querySelectorAll(".months li").forEach((month) => {
        month.addEventListener("click", () => {
            currentYear = parseInt(month.getAttribute("data-year"));
            currentMonth = parseInt(month.getAttribute("data-month"));
            document.querySelector("#wrapper-day").style.display = "block";
            document.querySelector("#wrapper-month").style.display = "none";
            renderDays();
        });
    });

    document.querySelector(".month-current").addEventListener("click", () => {
        document.querySelector("#wrapper-month").style.display = "none";
        document.querySelector("#wrapper-year").style.display = "block";
    });
};

renderMonth();

// Add event listener to update days when month is selected

const iconsMonths = document.querySelectorAll(".icons-month span");
iconsMonths.forEach((icon) => {
    icon.addEventListener("click", () => {
        icon.id === "prev" ? currentYear-- : currentYear++;
        renderMonth();
    });
});

document.querySelector(".months").addEventListener("wheel", (event) => {
    console.log({ event });

    if (event.deltaY < 0) {
        // Cuộn lên để về tháng trước
        currentYear -= 1;
    } else {
        // Cuộn xuống để qua tháng sau
        currentYear += 1;
    }

    renderMonth();
    event.preventDefault(); // Ngăn chặn cuộn trang mặc định
});

// ----------------------------RENDER YEAR---------------------------------
const renderYears = () => {
    const yearsElement = document.querySelector(".years");
    const startDecade = Math.floor(currentYear / 10) * 10;
    const endDecade = startDecade + 9;
    let YearTags = "";

    // Lặp qua các năm và tạo HTML
    for (let i = startDecade - 2; i <= endDecade + 4; i++) {
        let isCurrentYear = i === new Date().getFullYear() ? "active" : "";
        if (i >= startDecade && i <= endDecade) {
            YearTags += `<li data-year="${i}" class="${isCurrentYear}">${i}</li>`;
        } else {
            YearTags += `<li data-year="${i}" class="inactive">${i}</li>`;
        }
    }

    // Áp dụng nội dung vào phần tử
    yearsElement.innerHTML = YearTags;
    document.querySelector(".decade").innerHTML = `${startDecade} - ${endDecade}`;

    // Gắn sự kiện click cho các năm
    document.querySelectorAll(".years li").forEach((month) => {
        month.addEventListener("click", () => {
            currentYear = parseInt(month.getAttribute("data-year"));
            currentMonth = parseInt(month.getAttribute("data-month"));
            document.querySelector("#wrapper-year").style.display = "none";
            document.querySelector("#wrapper-month").style.display = "block";
            renderMonth();
        });
    });
};

// Gọi hàm renderYears lần đầu tiên
renderYears();

// Quản lý sự kiện cho các nút chuyển thập kỷ
const iconsYear = document.querySelectorAll(".icons-year span");
iconsYear.forEach((icon) => {
    icon.addEventListener("click", () => {
        // Cập nhật năm hiện tại và thập kỷ
        currentYear += icon.id === "prev" ? -10 : 10;
        renderYears();
    });
});

document.querySelector(".years").addEventListener("wheel", (event) => {
    console.log({ event });

    if (event.deltaY < 0) {
        // Cuộn lên để về tháng trước
        currentYear += -10;
    } else {
        // Cuộn xuống để qua tháng sau
        currentYear += 10;
    }

    renderYears();
    event.preventDefault(); // Ngăn chặn cuộn trang mặc định
});
