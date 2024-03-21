import { Timeline, Input } from 'antd';
import moment from 'moment';
import React, { useCallback, useEffect } from 'react';
import { Button, ButtonGroup, Drawer, IconButton, Panel, Table, Tooltip, Whisper } from 'rsuite';
import VisibleIcon from '@rsuite/icons/Visible';
import { useConsults } from '../../hooks/hooksConsults';
import Loading from '../../../../components/Loading';
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";

interface dataDrawer {
  open: boolean;
  onClose: () => void;
  onClickCancel: () => void;
  request_key: string;
}

const DrawerCVSDetails: React.FC<dataDrawer> = ({ open, onClose, onClickCancel, request_key }) => {
  const { Column, HeaderCell, Cell } = Table;
  const { TextArea } = Input;
  const { dataDetails } = useConsults();

  const statusDescription = dataDetails.status_description || '';
  let datas;
  if (statusDescription.includes('..')) {
    datas = statusDescription.split('..');
  } else if (statusDescription.includes('<br>')) {
    datas = statusDescription.split('<br>');
  } else {
    datas = [statusDescription];
  }

  const textoComQuebras = datas.map((data, index) => data.trim()).join('\n');

  const items =
    dataDetails.event && dataDetails.event.status && dataDetails.event.status.history
      ? Object.values(dataDetails.event.status.history).map((item) => ({
          children: (
            <>
              <p>{moment(item.datetime).format('DD/MM/YYYY - HH:mm:ss')}</p>
              <p>{item.user}</p>
              <p>{item.message}</p>
            </>
          )
        }))
      : [];

  const handleView = useCallback((data: any) => {
    console.log('data:',data);
    
  },[])    

  const newStyles = {
    variables: {
      light: {
        codeFoldGutterBackground: "#6F767E",
        codeFoldBackground: "#E2E4E5"
      }
    }
  };

  return (
    <Drawer open={open} onClose={onClose} size="calc(100% - 120px)">
      <Drawer.Header>
        <Drawer.Title>
          Alteração no codigo
        </Drawer.Title>
        <Drawer.Actions>
          <Button onClick={onClickCancel} color="red" appearance="primary">
            Fechar
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
