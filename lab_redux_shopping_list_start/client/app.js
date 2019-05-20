const {createStore} = require('redux');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JS loaded');

  const listReducer=(state=[],action)=>{
    switch (action.type) {
      case 'ADD_ITEM':{
        const newList = [...state, action.item]
        return newList;
      }
      case 'REMOVE_ITEM':{
        let newList = []
        state.forEach((element)=>{
          if (element != action.item){
            newList.push(element)
            console.log(newList);
          }
        })
        return newList;
      }
      default:
        return state;
    }
  }

  const listStore = createStore(listReducer);

  const listForm = document.querySelector("#shopping-list-form");
  listForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    listStore.dispatch({type:'ADD_ITEM', item:event.target.item.value});
  });

  const removalForm = document.querySelector("#remove-item");
  removalForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    listStore.dispatch({type:'REMOVE_ITEM', item:event.target.item.value});
  });

  listStore.subscribe(()=>{
    render();
  })

  const render= () => {
    const listContainer = document.querySelector("#shopping-list");
    listContainer.innerHTML='';
    const list = listStore.getState();
    list.forEach((item,index)=>{
      const listElement = document.createElement('li');
      listElement.textContent = item;
      listContainer.appendChild(listElement);
    });
  };

});
