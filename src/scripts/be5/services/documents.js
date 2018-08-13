import be5              from '../be5';


export const updateLocationHashIfNeeded = (props) => {
  let self;
  if(props.value.data !== undefined){
    self = props.value.data.links.self;
  }else{
    self = props.value.errors[0].links.self;
  }

  if(props.frontendParams && props.frontendParams.documentName === be5.MAIN_DOCUMENT
    && be5.url.get() !== '#!' + self)
  {
    be5.url.set(self)
  }
};
