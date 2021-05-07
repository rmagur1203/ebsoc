import { Common } from ".";

export async function download(token, data: { subLessonSeq: number }) {
    let detail = await Common.lecture.detail.lesson.$subLessonSeq(token, { subLessonSeq: data.subLessonSeq });
    
}