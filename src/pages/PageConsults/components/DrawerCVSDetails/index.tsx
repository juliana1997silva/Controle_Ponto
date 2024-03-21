import React from 'react';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';
import { Button, Drawer } from 'rsuite';

interface dataDrawer {
  open: boolean;
  onClose: () => void;
  onClickCancel: () => void;
}

const DrawerCVSDetails: React.FC<dataDrawer> = ({ open, onClose, onClickCancel }) => {
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
        <ReactDiffViewer
          oldValue={`case 6:
        $MsgLoginFailed = $AD_msgs[$res];
        break;
    }
    LogTransaction ($PHP_SELF, 0, 2, "login", "User_Id=$user_id", $MsgLoginFailed);
    if ( $block == 2 ) {
      echo "<html><head><TITLE>";
        `}
          newValue={`case 6:
        $MsgLoginFailed = $AD_msgs[$res];
        break;
   }

   // Select para trazer a mensagem de login de erro default
   $LoginMSGALT  = db_select("select prm_value from parameter where prm_id = 'LOGINMSGAL'", 1 );
   $row_MsgAlt = db_fetch_row($LoginMSGALT);
   if ( isset($row_MsgAlt[0]) && empty($row_MsgAlt[0]) )
     $MsgLoginFailed = $row_MsgAlt[0];

    LogTransaction ($PHP_SELF, 0, 2, "login", "User_Id=$user_id", $MsgLoginFailed);
    if ( $block == 2 ) {
      echo "<html><head><TITLE>";`}
          splitView={true}
          compareMethod={DiffMethod.WORDS}
          styles={newStyles}
          leftTitle="Revision 2.56"
          rightTitle="Revision 2.57"
        />
      </Drawer.Body>
    </Drawer>
  );
};
export default DrawerCVSDetails;
