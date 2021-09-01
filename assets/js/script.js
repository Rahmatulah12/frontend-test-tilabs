const buttonNext = document.querySelector("#btn1");
const formData = document.querySelector("#formData");
const content1 = document.querySelector("#content1")
const content2 = document.querySelector("#content2")
const content3 = document.querySelector("#content3")
const content4 = document.querySelector("#content4")
const content5 = document.querySelector("#content5")
const containerFormPilGan = document.querySelector("#containerFormPilGan");
const containerFormPendek = document.querySelector("#containerFormPendek");
const containerFormText = document.querySelector("#containerFormText");
const btnAdd = document.querySelector("#add");
const btnCreateQuestion = document.querySelector("#createQuestion");

buttonNext.addEventListener('click', (e) => {
    e.preventDefault();
    const form = new FormData(formData);
    let data = {};

    form.forEach((value, index) => {
        data[index] = value;
    });

    sessionStorage.setItem("profil", JSON.stringify(data));
    content1.classList.add("hidden")
    content2.classList.remove("hidden");
});

window.onload = () => {
    defaulViewStart();
}

function defaulViewStart() {
    sessionStorage.clear();
    content2.classList.add("hidden")
    containerFormPilGan.classList.add("hidden");
    containerFormPendek.classList.add("hidden");
    containerFormText.classList.add("hidden");
    btnAdd.classList.add("hidden");
    content3.classList.add("hidden");
    content4.classList.add("hidden");
    content5.classList.add("hidden");
}

const selectCategory = document.querySelector("#category");

selectCategory.addEventListener('change', (e) => {
    btnAdd.classList.remove("hidden");
    if (selectCategory.value == "pilgan") {
        containerFormPilGan.classList.remove("hidden");
        containerFormPendek.classList.add("hidden");
        containerFormText.classList.add("hidden");
    } else if (selectCategory.value == 'text') {
        containerFormPilGan.classList.add("hidden");
        containerFormPendek.classList.add("hidden");
        containerFormText.classList.remove("hidden");
    } else if (selectCategory.value == 'pendek') {
        containerFormPilGan.classList.add("hidden");
        containerFormPendek.classList.remove("hidden");
        containerFormText.classList.add("hidden");
    }
});

const decisionAddForm = () => {

    let dataSessionStorage = sessionStorage.getItem('formSoal') ? sessionStorage.getItem('formSoal') : null;

    if (selectCategory.value == "pilgan") {
        addDataPilGan(dataSessionStorage);
    } else if (selectCategory.value == 'text') {
        addDataSoalText(dataSessionStorage);
    } else if (selectCategory.value == 'pendek') {
        addDataSoalPendek(dataSessionStorage);
    }

    printReviewQuestion();
    btnCreateQuestion.classList.remove('hidden');
}

function addDataPilGan(data) {
    const formPilGan = document.querySelector("#formPilGan");
    const formData = new FormData(formPilGan);

    formData.append("type", "pilgan");

    let dataPilGan = {};
    let array = [];

    formData.forEach((value, index) => {
        dataPilGan[index] = value;
    });

    array.push(dataPilGan);

    if (data == null) {
        sessionStorage.setItem('formSoal', JSON.stringify(array));
    } else {
        let dataCurrent = JSON.parse(sessionStorage.getItem('formSoal'));
        let dataBaru = array.concat(dataCurrent);

        sessionStorage.setItem('formSoal', JSON.stringify(dataBaru));
    }

    clearInput();
}

function addDataSoalPendek(dataSessionStorage) {
    const form = document.querySelector("#formPendek");
    const formData = new FormData(form);

    formData.append("type", "pendek");

    let data = {};
    let array = [];

    formData.forEach((value, index) => {
        data[index] = value;
    });

    array.push(data);

    if (dataSessionStorage == null) {
        sessionStorage.setItem('formSoal', JSON.stringify(array));
    } else {
        let dataCurrent = JSON.parse(sessionStorage.getItem('formSoal'));
        let dataBaru = array.concat(dataCurrent);

        sessionStorage.setItem('formSoal', JSON.stringify(dataBaru));
    }

    clearInput();
}

function clearInput() {
    document.querySelector("#soal").value = '';
    document.querySelector("#jawaban1").value = '';
    document.querySelector("#jawaban2").value = '';
    document.querySelector("#jawaban3").value = '';
    document.querySelector("#jawaban4").value = '';
    document.querySelector("#soal_pendek").value = '';
    document.querySelector("#soal_text").value = '';
}

function addDataSoalText(dataSessionStorage) {
    const form = document.querySelector("#formText");
    const formData = new FormData(form);

    formData.append("type", "text");

    let data = {};
    let array = [];

    formData.forEach((value, index) => {
        data[index] = value;
    });

    array.push(data);

    if (dataSessionStorage == null) {
        sessionStorage.setItem('formSoal', JSON.stringify(array));
    } else {
        let dataCurrent = JSON.parse(sessionStorage.getItem('formSoal'));
        let dataBaru = array.concat(dataCurrent);

        sessionStorage.setItem('formSoal', JSON.stringify(dataBaru));
    }

    clearInput();
}

function printReviewQuestion() {
    let html = '';

    let dataForm = JSON.parse(sessionStorage.getItem('formSoal'));

    dataForm.reverse();
    dataForm.forEach((value, index) => {
        if (value.soal) {
            html += `
                <h5>${value.soal}</h5>
            `;
        }

        let jawaban1 = value.jawaban1 ? value.jawaban1 : null;
        let jawaban2 = value.jawaban2 ? value.jawaban2 : null;
        let jawaban3 = value.jawaban3 ? value.jawaban3 : null;
        let jawaban4 = value.jawaban4 ? value.jawaban4 : null;

        if (jawaban1 != null && jawaban2 != null && jawaban3 != null && jawaban4 != null) {
            html += `
                <p>${jawaban1}</p>
                <p>${jawaban2}</p>
                <p>${jawaban3}</p>
                <p>${jawaban4}</p>
            `;
        }

    });

    document.querySelector("#tampilQuestion").innerHTML = html;
}

btnCreateQuestion.addEventListener('click', () => {
    content2.classList.add("hidden")
    containerFormPilGan.classList.add("hidden");
    containerFormPendek.classList.add("hidden");
    containerFormText.classList.add("hidden");
    btnAdd.classList.add("hidden");
    content3.classList.remove("hidden");
    showViewSoal();
});

function showViewSoal() {
    let html = '';
    let dataSessionStorage = sessionStorage.getItem('formSoal') ? sessionStorage.getItem('formSoal') : null;

    let data = JSON.parse(dataSessionStorage);

    html += `
        <div class="card mx-auto mt-5" style="width: 50%;">
            <div class="card-body">
    `;

    for (i = 0; i < data.reverse().length; i++) {
        let jawaban1 = data[i].jawaban1 ? data[i].jawaban1 : null;
        let jawaban2 = data[i].jawaban2 ? data[i].jawaban2 : null;
        let jawaban3 = data[i].jawaban3 ? data[i].jawaban3 : null;
        let jawaban4 = data[i].jawaban4 ? data[i].jawaban4 : null;
        let soal = data[i].soal ? data[i].soal : null;
        let type = data[i].type ? data[i].type : null;

        let counter = i + 1;

        html += `<form id="formJawaban${counter}" class="px-3">`;

        if (counter > 1) {
            html += `
                <div id="page${counter}" class="hidden">
            `;
        } else if (counter <= 1) {
            html += `
                <div id="page${counter}">
            `;
        }

        if (type == 'pilgan') {
            html += `
            <div class="row">
                <h5 class="card-title my-5 text-center">
                    Soal Pilihan Ganda
                </h5>
                <h6>
                    ${soal}
                </h6>
                <!-- Left -->
                <div class="col-sm-6 col-md-6 col-lg-6">
                <input type="hidden" value="${soal}" name="soal" id="soal${counter}"/>
                <input type="hidden" value="${type}" name="type" id="type${counter}"/>
                    <div class="form-check mb-3">
                        <input class="form-check-input" type="radio" name="jawaban" id="${jawaban1}"
                            value="${jawaban1}"
                        >
                        <label class="form-check-label" for="${jawaban1}">
                            ${jawaban1}
                        </label>
                    </div>
                    <div class="form-check mb-3">
                        <input class="form-check-input" type="radio" name="jawaban" id="${jawaban2}" 
                            value="${jawaban2}"
                        >
                        <label class="form-check-label" for="${jawaban2}">
                            ${jawaban2}
                        </label>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-9">
                            <input type="text" class="form-control input-garis" id="jawaban_sendiri_${counter}" name="jawaban_sendiri" placeholder="isi sendiri">
                        </div>
                    </div>

                </div>
                <!-- End Of  Left -->

                <!-- Right -->
                <div class="col-sm-6 col-md-6 col-lg-6">

                    <div class="form-check mb-3">
                        <input class="form-check-input" type="radio" name="jawaban" id="${jawaban3}"
                            value="${jawaban3}"
                        >
                        <label class="form-check-label" for="${jawaban3}">
                            ${jawaban3}
                        </label>
                    </div>
                    <div class="form-check mb-3">
                        <input class="form-check-input" type="radio" name="jawaban" id="${jawaban4}" 
                            value="${jawaban4}"
                        >
                        <label class="form-check-label" for="${jawaban4}">
                            ${jawaban4}
                        </label>
                    </div>

                </div>

            </div>
            `;
        } else if (type == 'pendek') {
            html += `
                <div class="row">
                    <h5 class="card-title my-5 text-center">
                        Soal Text
                    </h5>
                    <h6>
                        ${soal}
                    </h6>
                    <input type="hidden" value="${soal}" name="soal" id="soal${counter}"/>
                    <input type="hidden" value="${type}" name="type" id="type${counter}"/>
                    <div class="col-sm-12 col-md-12">
                        <div class="form-group">
                            <input type="text" class="form-control input-garis" id="jawaban_essai${counter}" name="jawaban">
                        </div>
                    </div>
                </div>
            `;
        } else if (type == 'text') {
            html += `
                <div class="row">
                    <h5 class="card-title my-5 text-center">
                        Soal Text
                    </h5>
                    <input type="hidden" value="${soal}" name="soal" id="soal${counter}"/>
                    <input type="hidden" value="${type}" name="type" id="type${counter}"/>
                    <div class="col-sm-12 col-md-12">
                        <div class="form-floating">
                            <textarea class="form-control" placeholder="Jawaban text" id="jawaban_essai${counter}"
                                name="jawaban"
                            ></textarea>
                            <label for="jawaban_essai${counter}">${soal}</label>
                        </div>
                    </div>
                </div>
            `;
        }

        if (counter + 1 <= data.reverse().length) {
            html += `
                <button type="button" id="btnNext${counter}" 
                    class="btn btn-sm btn-warning text-white float-end my-4"
                    onclick="showViewFormJawaban(${counter}, ${counter + 1});"
                >
                    Next
                </button>
            `;
        } else if (counter + 1 > data.reverse().length) {
            html += `
                <button type="button" id="viewHasilTest" 
                    class="btn btn-sm btn-success text-white float-end my-4"
                    onclick="selesaiTest(${counter})"
                >
                    Selesai
                </button>
            `;
        }

        html += `
            </div>
        `;
        html += "</form>";
    }

    html += `
            </div>
        </div>
    `;

    content3.innerHTML = html;
}

function showViewFormJawaban(idCurrent, idNext) {
    const form = document.querySelector(`#formJawaban${idCurrent}`);
    const formData = new FormData(form);
    const dataStorageFormJawaban = sessionStorage.getItem('jawaban') ?
        sessionStorage.getItem('jawaban') : null;
    const soal = document.querySelector(`#soal${idCurrent}`).value
    const type = document.querySelector(`#type${idCurrent}`).value

    let data = {};
    let array = [];

    formData.append("soal", soal)
    formData.append("type", type)

    formData.forEach((value, index) => {
        if (value != "") {
            data[index] = value
        }
    });

    console.log(data);
    // return false;

    array.push(data);

    if (dataStorageFormJawaban == null) {
        sessionStorage.setItem('jawaban', JSON.stringify(array));
    } else {
        let dataCurrentStorageJawaban = JSON.parse(sessionStorage.getItem('jawaban'));
        let dataBaru = array.concat(dataCurrentStorageJawaban);
        sessionStorage.setItem('jawaban', JSON.stringify(dataBaru))
    }

    pageCurrent = document.querySelector(`#page${idCurrent}`).classList.add("hidden");
    pageNext = document.querySelector(`#page${idNext}`).classList.remove("hidden");
}

function selesaiTest(idCurrent) {
    const form = document.querySelector(`#formJawaban${idCurrent}`);
    const formData = new FormData(form);
    const dataStorageFormJawaban = sessionStorage.getItem('jawaban') ?
        sessionStorage.getItem('jawaban') : null;
    const soal = document.querySelector(`#soal${idCurrent}`).value
    const type = document.querySelector(`#type${idCurrent}`).value

    let data = {};
    let array = [];

    formData.append("soal", soal)
    formData.append("type", type)

    formData.forEach((value, index) => {
        if (value != "") {
            data[index] = value
        }
    });

    console.log(data);
    // return false;

    array.push(data);

    if (dataStorageFormJawaban == null) {
        sessionStorage.setItem('jawaban', JSON.stringify(array));
    } else {
        let dataCurrentStorageJawaban = JSON.parse(sessionStorage.getItem('jawaban'));
        let dataBaru = array.concat(dataCurrentStorageJawaban);
        sessionStorage.setItem('jawaban', JSON.stringify(dataBaru))
    }

    const textSelesai = document.querySelector("#textSelesai");
    let profil = JSON.parse(sessionStorage.getItem('profil'));

    let textSelesaiHtml = `
        <p class="text-center">Thank you <span class="text-success">${profil.nama}</span> for answering this question.</p>
        <p class="text-center text-success">${profil.tlpn}</p>
        <div class="d-flex justify-content-center">
            <button class="text-center btn btn-sm btn-warning text-white" onClick="lihatJawaban()">
                Lihat Jawaban
            </button>
        </div>
    `;
    textSelesai.innerHTML = textSelesaiHtml;
    content3.classList.add("hidden");
    content4.classList.remove("hidden");
}

function lihatJawaban() {
    let html = '';
    let dataJawaban = JSON.parse(sessionStorage.getItem('jawaban'));

    html += `
        <div class="card mx-auto mt-5" style="width: 50%;">
            <div class="card-header bg-white">
                <h5 class="text-center mt-3">Jawaban</h5>
            </div>
            <div class="card-body">
    `;

    for (i = 0; i < dataJawaban.length; i++) {
        let type = dataJawaban[i].type ? dataJawaban[i].type : null;
        let soal = dataJawaban[i].soal ? dataJawaban[i].soal : null;
        let jawaban = dataJawaban[i].jawaban ? dataJawaban[i].jawaban : null;
        if (type == 'pilgan') {
            html += `
                <h6 class="text-center my-2">
                    Jawaban Pilihan Ganda
                </h6>
                <p class="my-0 px-2 bg-warning">Q: ${soal}</p>
                <p class="my-0 px-2 bg-success">A: ${jawaban}</p>
            `;
        } else if (type == 'pendek') {
            html += `
                <h6 class="text-center my-2">
                    Jawaban Pendek
                </h6>
                <p class="my-0 px-2 bg-warning">Q: ${soal}</p>
                <p class="my-0 px-2 bg-success">A: ${jawaban}</p>
            `;

        } else if (type == 'text') {
            html += `
                <h6 class="text-center my-2">
                    Jawaban Text
                </h6>
                <p class="my-0 px-2 bg-warning">Q: ${soal}</p>
                <p class="my-0 px-2 bg-success">A: ${jawaban}</p>
            `;
        }
    }

    html += `
                <div class="d-flex justify-content-center">
                    <button type="button" class="btn btn-sm btn-danger" onclick="closed()">CLOSE</button>
                </div>
            </div>
        </div>
    `;
    content5.innerHTML = html;
    content4.classList.add("hidden");
    content5.classList.remove("hidden");
}

function closed() {
    content1.classList.remove('hidden');
    defaulViewStart();
}