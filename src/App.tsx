import React from 'react';
import {Entity, Testing} from 'types'


const obj: Testing = {
  name: "ola",
  age: 123,
  email: "a@b.c"
}

const obj2: Entity = {
  name: "duda",
  age: 22,
  lastName: "xx"
}

export const App = () => {
  return (
      <h1>
        {obj.name} ma {obj.age}!
        {obj2.name} ma {obj2.age}!

      </h1>
  );
}

export default App;
