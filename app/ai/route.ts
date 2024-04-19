import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';
import { OpenAIStream } from "ai";
import { StreamingTextResponse } from "ai";
import { NextRequest } from 'next/server';
import { AiInstructionPrompt } from '@/utils/prompt';

const openAi = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPEN_API_KEY });

export async function POST(request: NextRequest) {
    const body = await request.json();
    console.log(body.message)
    if (request.method === 'POST') {
        const completion = await openAi.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: AiInstructionPrompt
                },
                {
                    role:'user',
                    content: "TASK - 2: create a flowchart of 5 steps on how to become a UI developer"
                },
                {
                    role: 'system',
                    content: `{"action": "create", "message": "Sure! here you go", "shapes": [ { "x": -369.412795597734, "y": 36.80592694223151, "rotation": 0, "isLocked": false, "opacity": 1, "meta": {}, "id": "shape:Step1", "type": "geo", "props": { "w": 150, "h": 80, "geo": "rectangle", "color": "blue", "labelColor": "black", "fill": "none", "dash": "draw", "size": "m", "font": "draw", "text": "Step 1: Learn HTML, CSS, and JavaScript", "align": "middle", "verticalAlign": "middle", "growY": 100.4765625, "url": "" }, "parentId": "page:page", "index": "a1", "typeName": "shape" }, { "x": -105.29781389489881, "y": 36.87804104174151, "rotation": 0, "isLocked": false, "opacity": 1, "meta": {}, "id": "shape:Step2", "type": "geo", "props": { "w": 150, "h": 80, "geo": "rectangle", "color": "green", "labelColor": "black", "fill": "none", "dash": "draw", "size": "m", "font": "draw", "text": "Step 2: Master UI/UX design principles", "align": "middle", "verticalAlign": "middle", "growY": 100.4765625, "url": "" }, "parentId": "page:page", "index": "a2", "typeName": "shape" }, { "x": 172.0584259256617, "y": 31.702467592291327, "rotation": 0, "isLocked": false, "opacity": 1, "meta": {}, "id": "shape:Step3", "type": "geo", "props": { "w": 150, "h": 80, "geo": "rectangle", "color": "red", "labelColor": "black", "fill": "none", "dash": "draw", "size": "m", "font": "draw", "text": "Step 3: Learn front-end frameworks like React or Angular", "align": "middle", "verticalAlign": "middle", "growY": 159.8671875, "url": "" }, "parentId": "page:page", "index": "a3", "typeName": "shape" }, { "x": 440.64448179811836, "y": 30.986873835614972, "rotation": 0, "isLocked": false, "opacity": 1, "meta": {}, "id": "shape:Step4", "type": "geo", "props": { "w": 150, "h": 80, "geo": "rectangle", "color": "orange", "labelColor": "black", "fill": "none", "dash": "draw", "size": "m", "font": "draw", "text": "Step 4: Practice responsive web design", "align": "middle", "verticalAlign": "middle", "growY": 100.4765625, "url": "" }, "parentId": "page:page", "index": "a4", "typeName": "shape" }, { "x": 697.2041247676725, "y": 30.770531537084906, "rotation": 0, "isLocked": false, "opacity": 1, "meta": {}, "id": "shape:Step5", "type": "geo", "props": { "w": 150, "h": 80, "geo": "rectangle", "color": "yellow", "labelColor": "black", "fill": "none", "dash": "draw", "size": "m", "font": "draw", "text": "Step 5: Build a portfolio of UI projects", "align": "middle", "verticalAlign": "middle", "growY": 100.4765625, "url": "" }, "parentId": "page:page", "index": "a5", "typeName": "shape" }, { "x": -220.6067656529434, "y": 125.02258033671367, "rotation": 0, "isLocked": false, "opacity": 1, "meta": {}, "id": "shape:9FgjGYQTVv3MZhhp_G4ig", "type": "line", "parentId": "page:page", "index": "a6", "props": { "dash": "draw", "size": "m", "color": "black", "spline": "line", "points": { "a1": { "id": "a1", "index": "a1", "x": 0, "y": 0 }, "a2": { "id": "a2", "index": "a2", "x": 109.93517108381974, "y": -0.16086991429159525 } } }, "typeName": "shape" }, { "x": 46.64253989278188, "y": 124.65091536231586, "rotation": 0, "isLocked": false, "opacity": 1, "meta": {}, "id": "shape:qO_8t6LzKtMY6uB7Yaj35", "type": "line", "parentId": "page:page", "index": "a7", "props": { "dash": "draw", "size": "m", "color": "black", "spline": "line", "points": { "a1": { "id": "a1", "index": "a1", "x": 0, "y": 0 }, "a2": { "id": "a2", "index": "a2", "x": 122.1723790468285, "y": 0 } } }, "typeName": "shape" }, { "x": 322.3846674654185, "y": 123.21418061053922, "rotation": 0, "isLocked": false, "opacity": 1, "meta": {}, "id": "shape:u2It5okXsXuhq8SWvVv-l", "type": "line", "parentId": "page:page", "index": "a8", "props": { "dash": "draw", "size": "m", "color": "black", "spline": "line", "points": { "a1": { "id": "a1", "index": "a1", "x": 0, "y": 0 }, "a2": { "id": "a2", "index": "a2", "x": 118.06742261318095, "y": 0 } } }, "typeName": "shape" }, { "x": 591.087349478192, "y": 122.67609848342596, "rotation": 0, "isLocked": false, "opacity": 1, "meta": {}, "id": "shape:NeIyLsa0r0dF_7of0BUyJ", "type": "line", "parentId": "page:page", "index": "a9", "props": { "dash": "draw", "size": "m", "color": "black", "spline": "line", "points": { "a1": { "id": "a1", "index": "a1", "x": 0, "y": 0 }, "a2": { "id": "a2", "index": "a2", "x": 102.0469980451079, "y": 0 } } }, "typeName": "shape" } ]`   
                },
                {
                    role: 'user',
                    content: `Task - 1: [ { "x": -369.412795597734, "y": 36.80592694223151, "rotation": 0, "isLocked": false, "opacity": 1, "meta": {}, "id": "shape:Step1", "type": "geo", "props": { "w": 150, "h": 80, "geo": "rectangle", "color": "blue", "labelColor": "black", "fill": "none", "dash": "draw", "size": "m", "font": "draw", "text": "Step 1: Learn HTML, CSS, and JavaScript", "align": "middle", "verticalAlign": "middle", "growY": 100.4765625, "url": "" }, "parentId": "page:page", "index": "a1", "typeName": "shape" }, { "x": -105.29781389489881, "y": 36.87804104174151, "rotation": 0, "isLocked": false, "opacity": 1, "meta": {}, "id": "shape:Step2", "type": "geo", "props": { "w": 150, "h": 80, "geo": "rectangle", "color": "green", "labelColor": "black", "fill": "none", "dash": "draw", "size": "m", "font": "draw", "text": "Step 2: Master UI/UX design principles", "align": "middle", "verticalAlign": "middle", "growY": 100.4765625, "url": "" }, "parentId": "page:page", "index": "a2", "typeName": "shape" }, { "x": 172.0584259256617, "y": 31.702467592291327, "rotation": 0, "isLocked": false, "opacity": 1, "meta": {}, "id": "shape:Step3", "type": "geo", "props": { "w": 150, "h": 80, "geo": "rectangle", "color": "red", "labelColor": "black", "fill": "none", "dash": "draw", "size": "m", "font": "draw", "text": "Step 3: Learn front-end frameworks like React or Angular", "align": "middle", "verticalAlign": "middle", "growY": 159.8671875, "url": "" }, "parentId": "page:page", "index": "a3", "typeName": "shape" }, { "x": 440.64448179811836, "y": 30.986873835614972, "rotation": 0, "isLocked": false, "opacity": 1, "meta": {}, "id": "shape:Step4", "type": "geo", "props": { "w": 150, "h": 80, "geo": "rectangle", "color": "orange", "labelColor": "black", "fill": "none", "dash": "draw", "size": "m", "font": "draw", "text": "Step 4: Practice responsive web design", "align": "middle", "verticalAlign": "middle", "growY": 100.4765625, "url": "" }, "parentId": "page:page", "index": "a4", "typeName": "shape" }, { "x": 697.2041247676725, "y": 30.770531537084906, "rotation": 0, "isLocked": false, "opacity": 1, "meta": {}, "id": "shape:Step5", "type": "geo", "props": { "w": 150, "h": 80, "geo": "rectangle", "color": "yellow", "labelColor": "black", "fill": "none", "dash": "draw", "size": "m", "font": "draw", "text": "Step 5: Build a portfolio of UI projects", "align": "middle", "verticalAlign": "middle", "growY": 100.4765625, "url": "" }, "parentId": "page:page", "index": "a5", "typeName": "shape" }, { "x": -220.6067656529434, "y": 125.02258033671367, "rotation": 0, "isLocked": false, "opacity": 1, "meta": {}, "id": "shape:9FgjGYQTVv3MZhhp_G4ig", "type": "line", "parentId": "page:page", "index": "a6", "props": { "dash": "draw", "size": "m", "color": "black", "spline": "line", "points": { "a1": { "id": "a1", "index": "a1", "x": 0, "y": 0 }, "a2": { "id": "a2", "index": "a2", "x": 109.93517108381974, "y": -0.16086991429159525 } } }, "typeName": "shape" }, { "x": 46.64253989278188, "y": 124.65091536231586, "rotation": 0, "isLocked": false, "opacity": 1, "meta": {}, "id": "shape:qO_8t6LzKtMY6uB7Yaj35", "type": "line", "parentId": "page:page", "index": "a7", "props": { "dash": "draw", "size": "m", "color": "black", "spline": "line", "points": { "a1": { "id": "a1", "index": "a1", "x": 0, "y": 0 }, "a2": { "id": "a2", "index": "a2", "x": 122.1723790468285, "y": 0 } } }, "typeName": "shape" }, { "x": 322.3846674654185, "y": 123.21418061053922, "rotation": 0, "isLocked": false, "opacity": 1, "meta": {}, "id": "shape:u2It5okXsXuhq8SWvVv-l", "type": "line", "parentId": "page:page", "index": "a8", "props": { "dash": "draw", "size": "m", "color": "black", "spline": "line", "points": { "a1": { "id": "a1", "index": "a1", "x": 0, "y": 0 }, "a2": { "id": "a2", "index": "a2", "x": 118.06742261318095, "y": 0 } } }, "typeName": "shape" }, { "x": 591.087349478192, "y": 122.67609848342596, "rotation": 0, "isLocked": false, "opacity": 1, "meta": {}, "id": "shape:NeIyLsa0r0dF_7of0BUyJ", "type": "line", "parentId": "page:page", "index": "a9", "props": { "dash": "draw", "size": "m", "color": "black", "spline": "line", "points": { "a1": { "id": "a1", "index": "a1", "x": 0, "y": 0 }, "a2": { "id": "a2", "index": "a2", "x": 102.0469980451079, "y": 0 } } }, "typeName": "shape" } ]`
                },
                {
                    role:'system',
                    content: "I see a linear flowchart with five steps to learning web development, represented by colored rectangles connected by lines. To enhance this, consider adding arrows to the lines to clarify directionality and possibly integrating icons that represent each step for a more visually engaging and informative design."
                },
                {
                    role: "user",
                    content: `TASK - 2: could you create a rectangle with text hi there inside it`
                },
                {
                    role: 'system',
                    content: `{"action": "create", "message": "Absolutely! here you go" ,"shapes": [{"id": "shape:rectangle1", "type": "geo", "x": 0, "y": 0, "props": { "geo": "rectangle", "w": 200, "h": 100, "dash": "draw", "color": "black", "size": "m", "text": "hi there" } } ] }`
                },
                {
                    role:'user',
                    content: `${body.message}`
                },
            ],
            temperature: 0.2
        });
        // return Response.json({"message": body})
        const response = completion
        return Response.json({message: response.choices[0].message.content?.trim()});
    }

}
