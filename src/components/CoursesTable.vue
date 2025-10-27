<script setup>
import '../assets/styles/tables.css'
import Tooltip from "./Tooltip.vue";
import { computed, inject } from "vue";
import { useTable } from "@/composable/useTables";
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { courses, expandedRow, toggleExpand, getRateColor } = useTable();

const searchTerm = inject("searchTerm");
const selectedSort = inject("selectedSort");
const selectedFilter = inject("selectedFilter");

const filteredCourses = computed(() => {
    let list = courses.value.slice();

    if (searchTerm.value) {
        const term = searchTerm.value.toLowerCase();
        list = list.filter(c =>
            c.name.toLowerCase().includes(term) ||
            c.university.toLowerCase().includes(term) ||
            c.campus.toLowerCase().includes(term) ||
            c.type.toLowerCase().includes(term) ||
            c.studyPeriod.toLowerCase().includes(term)
        );
    }

    if (selectedFilter.value) {
        list = list.filter(c =>
            c.studyPeriod === selectedFilter.value ||
            c.type === selectedFilter.value
        );
    }

    if (selectedSort && selectedSort.value) {
        const key = selectedSort.value;
        list.sort((a, b) => {
            const va = a[key] ?? "";
            const vb = b[key] ?? "";
            const na = parseFloat(va);
            const nb = parseFloat(vb);
            if (!isNaN(na) && !isNaN(nb)) return na - nb;
            return String(va).localeCompare(String(vb));
        });
    }

    return list;
});
</script>

<template>
    <section class="table-wrapper">
        <table>
            <thead id="first-thead">
                <tr>
                    <th></th>
                    <th>{{ t("home.courseTable.courseName") }}</th>
                    <th>{{ t("home.courseTable.universityUnit") }}</th>
                    <th>{{ t("home.courseTable.campus") }}</th>
                    <th>{{ t("home.courseTable.type") }}</th>
                    <th>{{ t("home.courseTable.studyPeriod") }}</th>
                    <th class="dropout-rate">{{ t("home.courseTable.dropoutRate") }}</th>
                </tr>
            </thead>

            <tbody>
                <template v-for="course in filteredCourses" :key="course.id">
                    <tr>
                        <td class="main-table full-line">
                            <button @click="toggleExpand(course.id)">
                                {{ expandedRow === course.id ? "-" : "+" }}
                            </button>
                        </td>
                        <td class="main-table full-line">{{ course.name }}</td>
                        <td class="main-table full-line">{{ course.university }}</td>
                        <td class="main-table full-line">{{ course.campus }}</td>
                        <td class="main-table full-line">{{ course.type }}</td>
                        <td class="main-table full-line">{{ course.studyPeriod }}</td>
                        <td class="dropout-rate main-table" :class="getRateColor(course.dropoutRate)">
                            {{ course.dropoutRate }}%
                        </td>
                    </tr>
                    <tr v-if="expandedRow === course.id">
                        <td colspan="7">
                            <table id="sub-table">
                                <thead id="second-thead">
                                    <tr>
                                        <th class="start-column">{{ t("home.courseSubtable.name") }}</th>
                                        <th>
                                            <Tooltip :text="t('home.courseSubtable.P')">P</Tooltip>
                                        </th>
                                        <th>
                                            <Tooltip :text="t('home.courseSubtable.R')">R</Tooltip>
                                        </th>
                                        <th>
                                            <Tooltip :text="t('home.courseSubtable.G')">G</Tooltip>
                                        </th>
                                        <th>
                                            <Tooltip :text="t('home.courseSubtable.EM')">EM</Tooltip>
                                        </th>
                                        <th>
                                            <Tooltip :text="t('home.courseSubtable.C')">C</Tooltip>
                                        </th>
                                        <th>
                                            <Tooltip :text="t('home.courseSubtable.TI')">TI</Tooltip>
                                        </th>
                                        <th>
                                            <Tooltip :text="t('home.courseSubtable.S')">S</Tooltip>
                                        </th>
                                        <th>
                                            <Tooltip :text="t('home.courseSubtable.AM')">AM</Tooltip>
                                        </th>
                                        <th>
                                            <Tooltip :text="t('home.courseSubtable.IM')">IM</Tooltip>
                                        </th>
                                        <th>
                                            <Tooltip :text="t('home.courseSubtable.NAVG')">NM</Tooltip>
                                        </th>
                                        <th>
                                            <Tooltip :text="t('home.courseSubtable.FAVG')">FM</Tooltip>
                                        </th>
                                        <th>
                                            <Tooltip :text="t('home.courseSubtable.PR')">PR</Tooltip>
                                        </th>
                                        <th>
                                            <Tooltip :text="t('home.courseSubtable.PE')">PE</Tooltip>
                                        </th>
                                        <th>
                                            <Tooltip :text="t('home.courseSubtable.QD')">QD</Tooltip>
                                        </th>
                                        <th>
                                            <Tooltip :text="t('home.courseSubtable.AN')">AN</Tooltip>
                                        </th>
                                        <th class="dropout-rate">
                                            <Tooltip :text="t('home.courseSubtable.RE')">RE</Tooltip>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="student in course.students" :key="student.name">
                                        <tr>
                                            <td class="sub-table start-column">
                                                <p class="middle truncate">{{ student.name }}</p>
                                            </td>
                                            <td class="sub-table">{{ student.P }}</td>
                                            <td class="sub-table">{{ student.R }}</td>
                                            <td class="sub-table">{{ student.G }}</td>
                                            <td class="sub-table">{{ student.EM }}</td>
                                            <td class="sub-table">{{ student.C }}</td>
                                            <td class="sub-table">{{ student.TI }}</td>
                                            <td class="sub-table">{{ student.S }}</td>
                                            <td class="sub-table right">{{ student.AM }}</td>
                                            <td class="sub-table right">{{ student.IM }}</td>
                                            <td class="sub-table right">{{ student.NAVG }}</td>
                                            <td class="sub-table right">{{ student.FAVG }}</td>
                                            <td class="sub-table right">{{ student.PR }}</td>
                                            <td class="sub-table right">{{ student.PE }}</td>
                                            <td class="sub-table right">{{ student.QD }}</td>
                                            <td class="sub-table right">{{ student.AN }}</td>
                                            <td class="sub-table dropout-rate" :class="getRateColor(student.RE)">
                                                <p class="middle">{{ student.RE }}</p>
                                            </td>
                                        </tr>

                                        <tr class="percent-row" v-if="student.impact">
                                            <td class="full-line"></td>
                                            <td class="sub-table full-line">{{ student.impact.P }}</td>
                                            <td class="sub-table full-line">{{ student.impact.R }}</td>
                                            <td class="sub-table full-line">{{ student.impact.G }}</td>
                                            <td class="sub-table full-line">{{ student.impact.EM }}</td>
                                            <td class="sub-table full-line">{{ student.impact.C }}</td>
                                            <td class="sub-table full-line">{{ student.impact.TI }}</td>
                                            <td class="sub-table full-line">{{ student.impact.S }}</td>
                                            <td class="sub-table full-line">{{ student.impact.AM }}</td>
                                            <td class="sub-table full-line">{{ student.impact.IM }}</td>
                                            <td class="sub-table full-line">{{ student.impact.NAVG }}</td>
                                            <td class="sub-table full-line">{{ student.impact.FAVG }}</td>
                                            <td class="sub-table full-line">{{ student.impact.PR }}</td>
                                            <td class="sub-table full-line">{{ student.impact.PE }}</td>
                                            <td class="sub-table full-line">{{ student.impact.QD }}</td>
                                            <td class="sub-table full-line">{{ student.impact.AN }}</td>
                                            <td class="dropout-rate" :class="getRateColor(student.RE)"></td>
                                        </tr>
                                    </template>

                                    <tr v-if="!course.students.length">
                                        <td colspan="9">{{ t("home.table.noStudents") }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div id="small-blue"></div>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </section>
</template>


<style scoped>
button {
    background: none;
    border: none;
    font-weight: 600;
    font-size: 24px;
    cursor: pointer;
}
</style>
