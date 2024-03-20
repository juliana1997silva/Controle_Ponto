import React from 'react';
import { createIconFont } from '@rsuite/icons';

const IconFont = createIconFont({
  scriptUrl: '//at.alicdn.com/t/font_2144422_r174s9i1orl.js',
  commonProps: { style: { fontSize: 50, color: '#1675e0', position: 'relative', left: '50%', top: '50%' } },
  onLoaded: () => {
    //console.log('onLoaded');
  }
});

const Loading: React.FC = () => {
  return <IconFont icon="rs-iconreload" pulse />;
};

export default Loading;
