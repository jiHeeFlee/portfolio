import { useState } from 'react';
import { Container } from './style';

export default function Landing() {
  const [isClick, setIsClick] = useState<boolean>(false);

  return (
    <Container>
      Landing
      <button onClick={() => setIsClick(prev => !prev)}>
        {isClick && <p>클릭됨</p>}
        {!isClick && <p>클릭 해제됨</p>}
      </button>
    </Container>
  );
}
