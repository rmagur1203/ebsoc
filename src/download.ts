import { Common } from ".";

export async function download(token: string, data: { subLessonSeq: number }) {
    let detail = await Common.lecture.detail.lesson.$subLessonSeq(token, { subLessonSeq: data.subLessonSeq });
    
}