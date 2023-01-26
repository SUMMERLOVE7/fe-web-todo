const newCardLogTemplate = (columnName, cardTitle) => `
    <div class='menu-card'> 
        <div class='menu-emoji'>&#128526;</div> 
        <div class='one-menu-card'> 
            <div class = 'menu-person-name'> @Grace </div> 
        <div class = 'menu-caption'> ${columnName}에 ${cardTitle}이/가 추가되었습니다. </div>
        </div>
    </div>
`;

const updateCardLogTemplate = (columnName, cardTitle) => `
    <div class='menu-card'> 
        <div class='menu-emoji'>&#128526;</div> 
        <div class='one-menu-card'> 
            <div class = 'menu-person-name'> @Grace </div> 
            <div class = 'menu-caption'> ${columnName}의 카드 제목이 ${cardTitle}(으)로 수정되었습니다. </div>
        </div>
    </div>
`;

const deleteCardLogTemplate = (columnName, cardTitle) => `
    <div class='menu-card'> 
        <div class='menu-emoji'>&#128526;</div> 
        <div class='one-menu-card'> 
            <div class = 'menu-person-name'> @Grace </div> 
        <div class = 'menu-caption'> ${columnName} 칼럼의 ${cardTitle} 카드가 삭제되었습니다. </div>
        </div>
    </div>
`

export { newCardLogTemplate, updateCardLogTemplate, deleteCardLogTemplate }