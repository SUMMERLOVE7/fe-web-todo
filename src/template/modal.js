const columnModifyModalTemplate = (title, caption) => `
    <section class="open-modal">
        <div class='list-title-modal'>
            <textarea type='text' class='title-input textarea-input' name='title-input'>${title}</textarea>
        </div>
        <form>
            <div class='caption-modal'>
                <textarea type='text' class='caption-input textarea-input' name='caption-input'>${caption}</textarea>
            </div>
            <div class='modal-button'>
                <button type='button' class='cancel-modify-button'> 취소 </button>
                <button type='submit' class='modify-button'> 수정 </button>
            </div>
        </form>
    </section>
`

export { columnModifyModalTemplate }