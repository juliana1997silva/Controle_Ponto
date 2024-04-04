import React, { useEffect } from 'react';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';
import { Button, Drawer } from 'rsuite';
import { useConsults } from '../../hooks/hooksConsults';

interface dataDrawer {
  open: boolean;
  onClose: () => void;
  onClickCancel: () => void;
  request_key: string;
}

const DrawerCVSDetails: React.FC<dataDrawer> = ({ open, onClose, onClickCancel, request_key }) => {
  const { consultsDataCVS, consultCVSDetails } = useConsults();

  useEffect(() => {
    if (request_key) {
      consultCVSDetails({
        request_key: request_key
      });

      console.log('view: ', consultsDataCVS);
    }
  }, [request_key, consultCVSDetails]);

  const newStyles = {
    variables: {
      light: {
        codeFoldGutterBackground: '#6F767E',
        codeFoldBackground: '#E2E4E5'
      }
    }
  };

  return (
    <Drawer open={open} onClose={onClose} size="calc(100% - 120px)">
      <Drawer.Header>
        <Drawer.Title>Alteração no codigo</Drawer.Title>
        <Drawer.Actions>
          <Button onClick={onClickCancel} color="red" appearance="primary">
            Voltar
          </Button>
        </Drawer.Actions>
      </Drawer.Header>
      <Drawer.Body>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ marginRight: 15 }}></div>
        </div>
        {consultsDataCVS && consultsDataCVS.cvs && (
          <>
            {consultsDataCVS.cvs.program.map((program) => {
              console.log('LINE: ', program);

              return (
                <>
                  <h4>{program.file}</h4>
                  {program.changes.map((change) => (
                    <>
                      <ReactDiffViewer
                        oldValue={change.before.text}
                        newValue={change.after.text}
                        splitView={true}
                        compareMethod={DiffMethod.WORDS}
                        styles={newStyles}
                        leftTitle={change.before.line}
                        rightTitle={change.after.line}
                      />
                    </>
                  ))}
                </>
              );
            })}
          </>
        )}
      </Drawer.Body>
    </Drawer>
  );
};
export default DrawerCVSDetails;
