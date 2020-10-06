"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atom_haskell_utils_1 = require("atom-haskell-utils");
const util_cabal_format_1 = require("./util-cabal-format");
const util_stylish_haskell_1 = require("./util-stylish-haskell");
async function prettifyFile(editor) {
    const [firstCursor, ...cursors] = editor
        .getCursors()
        .map((cursor) => cursor.getBufferPosition());
    const format = editor.getGrammar().scopeName;
    const prettify = format === 'source.cabal' ? util_cabal_format_1.format : util_stylish_haskell_1.format;
    const workDir = (await atom_haskell_utils_1.getRootDir(editor.getBuffer())).getPath();
    try {
        const { stdout, stderr } = await prettify(editor.getText(), workDir, editor.getRootScopeDescriptor());
        editor.setText(stdout);
        const lastCursor = editor.getLastCursor();
        if (lastCursor) {
            lastCursor.setBufferPosition(firstCursor, { autoscroll: false });
        }
        cursors.forEach((cursor) => {
            editor.addCursorAtBufferPosition(cursor, { autoscroll: false });
        });
        if (stderr.length > 0) {
            atom.notifications.addWarning('Prettifier reported the following problems:', {
                detail: stderr,
                dismissable: true,
            });
        }
    }
    catch (e) {
        const err = e.error || e;
        let stderr = e.stderr ? e.stderr.trim() : '';
        if (err.message.includes(stderr)) {
            stderr = '';
        }
        atom.notifications.addError('Failed to prettify', {
            detail: `${stderr ? `${stderr}\n\n` : ''}${err.message}`,
            stack: err.stack,
            dismissable: true,
        });
    }
}
exports.prettifyFile = prettifyFile;
var editor_controller_1 = require("./editor-controller");
exports.PrettifyEditorController = editor_controller_1.PrettifyEditorController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJldHRpZnkvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwyREFBK0M7QUFDL0MsMkRBQTJEO0FBQzNELGlFQUErRDtBQUV4RCxLQUFLLHVCQUF1QixNQUFrQjtJQUNuRCxNQUFNLENBQUMsV0FBVyxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsTUFBTTtTQUNyQyxVQUFVLEVBQUU7U0FDWixHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUE7SUFDOUMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQTtJQUM1QyxNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssY0FBYyxDQUFDLENBQUMsQ0FBQywwQkFBVyxDQUFDLENBQUMsQ0FBQyw2QkFBWSxDQUFBO0lBQ3ZFLE1BQU0sT0FBTyxHQUFHLENBQUMsTUFBTSwrQkFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDaEUsSUFBSSxDQUFDO1FBQ0gsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLFFBQVEsQ0FDdkMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUNoQixPQUFPLEVBQ1AsTUFBTSxDQUFDLHNCQUFzQixFQUFFLENBQ2hDLENBQUE7UUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3RCLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQTtRQUN6QyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2YsVUFBVSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBQ2xFLENBQUM7UUFDRCxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDekIsTUFBTSxDQUFDLHlCQUF5QixDQUFDLE1BQU0sRUFBRSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBQ2pFLENBQUMsQ0FBQyxDQUFBO1FBQ0YsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUMzQiw2Q0FBNkMsRUFDN0M7Z0JBQ0UsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsV0FBVyxFQUFFLElBQUk7YUFDbEIsQ0FDRixDQUFBO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1gsTUFBTSxHQUFHLEdBQVUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUE7UUFDL0IsSUFBSSxNQUFNLEdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO1FBQ3BELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyxNQUFNLEdBQUcsRUFBRSxDQUFBO1FBQ2IsQ0FBQztRQUNELElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLG9CQUFvQixFQUFFO1lBQ2hELE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDeEQsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLO1lBQ2hCLFdBQVcsRUFBRSxJQUFJO1NBQ2xCLENBQUMsQ0FBQTtJQUNKLENBQUM7QUFDSCxDQUFDO0FBMUNELG9DQTBDQztBQUVELHlEQUE4RDtBQUFyRCx1REFBQSx3QkFBd0IsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRleHRFZGl0b3IgfSBmcm9tICdhdG9tJ1xuaW1wb3J0IHsgZ2V0Um9vdERpciB9IGZyb20gJ2F0b20taGFza2VsbC11dGlscydcbmltcG9ydCB7IGZvcm1hdCBhcyBjYWJhbEZvcm1hdCB9IGZyb20gJy4vdXRpbC1jYWJhbC1mb3JtYXQnXG5pbXBvcnQgeyBmb3JtYXQgYXMgZmlsdGVyRm9ybWF0IH0gZnJvbSAnLi91dGlsLXN0eWxpc2gtaGFza2VsbCdcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHByZXR0aWZ5RmlsZShlZGl0b3I6IFRleHRFZGl0b3IpIHtcbiAgY29uc3QgW2ZpcnN0Q3Vyc29yLCAuLi5jdXJzb3JzXSA9IGVkaXRvclxuICAgIC5nZXRDdXJzb3JzKClcbiAgICAubWFwKChjdXJzb3IpID0+IGN1cnNvci5nZXRCdWZmZXJQb3NpdGlvbigpKVxuICBjb25zdCBmb3JtYXQgPSBlZGl0b3IuZ2V0R3JhbW1hcigpLnNjb3BlTmFtZVxuICBjb25zdCBwcmV0dGlmeSA9IGZvcm1hdCA9PT0gJ3NvdXJjZS5jYWJhbCcgPyBjYWJhbEZvcm1hdCA6IGZpbHRlckZvcm1hdFxuICBjb25zdCB3b3JrRGlyID0gKGF3YWl0IGdldFJvb3REaXIoZWRpdG9yLmdldEJ1ZmZlcigpKSkuZ2V0UGF0aCgpXG4gIHRyeSB7XG4gICAgY29uc3QgeyBzdGRvdXQsIHN0ZGVyciB9ID0gYXdhaXQgcHJldHRpZnkoXG4gICAgICBlZGl0b3IuZ2V0VGV4dCgpLFxuICAgICAgd29ya0RpcixcbiAgICAgIGVkaXRvci5nZXRSb290U2NvcGVEZXNjcmlwdG9yKCksXG4gICAgKVxuICAgIGVkaXRvci5zZXRUZXh0KHN0ZG91dClcbiAgICBjb25zdCBsYXN0Q3Vyc29yID0gZWRpdG9yLmdldExhc3RDdXJzb3IoKVxuICAgIGlmIChsYXN0Q3Vyc29yKSB7XG4gICAgICBsYXN0Q3Vyc29yLnNldEJ1ZmZlclBvc2l0aW9uKGZpcnN0Q3Vyc29yLCB7IGF1dG9zY3JvbGw6IGZhbHNlIH0pXG4gICAgfVxuICAgIGN1cnNvcnMuZm9yRWFjaCgoY3Vyc29yKSA9PiB7XG4gICAgICBlZGl0b3IuYWRkQ3Vyc29yQXRCdWZmZXJQb3NpdGlvbihjdXJzb3IsIHsgYXV0b3Njcm9sbDogZmFsc2UgfSlcbiAgICB9KVxuICAgIGlmIChzdGRlcnIubGVuZ3RoID4gMCkge1xuICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZFdhcm5pbmcoXG4gICAgICAgICdQcmV0dGlmaWVyIHJlcG9ydGVkIHRoZSBmb2xsb3dpbmcgcHJvYmxlbXM6JyxcbiAgICAgICAge1xuICAgICAgICAgIGRldGFpbDogc3RkZXJyLFxuICAgICAgICAgIGRpc21pc3NhYmxlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgKVxuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnN0IGVycjogRXJyb3IgPSBlLmVycm9yIHx8IGVcbiAgICBsZXQgc3RkZXJyOiBzdHJpbmcgPSBlLnN0ZGVyciA/IGUuc3RkZXJyLnRyaW0oKSA6ICcnXG4gICAgaWYgKGVyci5tZXNzYWdlLmluY2x1ZGVzKHN0ZGVycikpIHtcbiAgICAgIHN0ZGVyciA9ICcnXG4gICAgfVxuICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRFcnJvcignRmFpbGVkIHRvIHByZXR0aWZ5Jywge1xuICAgICAgZGV0YWlsOiBgJHtzdGRlcnIgPyBgJHtzdGRlcnJ9XFxuXFxuYCA6ICcnfSR7ZXJyLm1lc3NhZ2V9YCxcbiAgICAgIHN0YWNrOiBlcnIuc3RhY2ssXG4gICAgICBkaXNtaXNzYWJsZTogdHJ1ZSxcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCB7IFByZXR0aWZ5RWRpdG9yQ29udHJvbGxlciB9IGZyb20gJy4vZWRpdG9yLWNvbnRyb2xsZXInXG4iXX0=