import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
    MenuItem,
    Select,
    TablePagination,
} from '@mui/material';
import Navbar from './Navbar';
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {  useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

// Styled components for custom styling
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        whiteSpace: 'nowrap',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
    height: "2px",
}));

const ViewVouchers = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditDateModalOpen, setEditDateModalOpen] = useState(false);
    const [selectedExamIndex, setSelectedExamIndex] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [editIndex, setEditIndex] = useState(-1);
    const [resultOptions] = useState(['Pass', 'Fail', 'Pending due to issue']);
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const obj = localStorage.getItem("userInfo");
    const { username } = JSON.parse(obj);

    const [isEditing, setIsEditing] = useState(-1);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch vouchers data from the backend
        const fetchVouchers = async () => {
            try {
                const response = await fetch(`http://localhost:8085/requests/${username}`);
                const result = await response.json();
                setData(result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchVouchers();
    }, []);

    // Function to navigate to request voucher page
    const handleRequestVoucher = () => {
        navigate('/requestform', { state: { username } });
    };

    // Function to handle editing of exam date
    const handleEditExamDate = (index) => {
        setSelectedExamIndex(index);
        setEditDateModalOpen(true);
    };

    // Function to handle editing of exam result
    const handleEditResult = (index) => {
        // ... (continued in the next comment block)
    };

    // Function to handle date change in the edit exam date modal
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    // Function to save the edited exam date
    const handleSaveExamDate = async () => {
        // ... (continued in the next comment block)
    };

    // Function to cancel the edit exam date modal
    const handleCancelEditDate = () => {
        setEditDateModalOpen(false);
        setSelectedExamIndex(null);
    };

    // Function to save the edited exam result
    const handleSaveResult = async (index) => {
        // ... (continued in the next comment block)
    };

    // Function to handle page change in the pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Function to handle rows per page change in the pagination
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            {/* Navigation bar component */}
            <Navbar />

            <div style={{ position: 'relative' }}>
                {/* Request Voucher button */}
                <Button onClick={handleRequestVoucher} variant="contained" color="success" style={{ position: 'absolute', top: '20px', left: '20px', marginTop: '-30px', zIndex: 1 }}>
                    Request Voucher
                </Button>

                {/* Vouchers table container */}
                <div className="container" style={{ marginTop: '30px', paddingTop: '80px' }}>
                    <Box>
                        <TableContainer component={Paper}>
                            <Table aria-label="customized table" style={{ width: "70%", marginLeft: "2%" }}>
                                {/* Table header */}
                                <TableHead>
                                    <StyledTableRow>
                                        <StyledTableCell style={{ minWidth: '200px' }}>Exam Name</StyledTableCell>
                                        <StyledTableCell >Cloud Platform</StyledTableCell>
                                        <StyledTableCell >Voucher Code</StyledTableCell>
                                        <StyledTableCell >Voucher Issued Date</StyledTableCell>
                                        <StyledTableCell >Voucher Expiry Date</StyledTableCell>
                                        <StyledTableCell style={{ minWidth: '150px' }}>Exam Date</StyledTableCell>
                                        <StyledTableCell style={{ minWidth: '200px' }}>Result</StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>

                                {/* Table body */}
                                <TableBody>
                                    {loading ? (
                                        // Loading indicator when data is still being fetched
                                        <StyledTableRow>
                                            <TableCell colSpan={7} className="table-cell">
                                                Loading Data..
                                            </TableCell>
                                        </StyledTableRow>
                                    ) : (
                                        // Render each row of data in the table
                                        data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((voucher, index) => (
                                            <StyledTableRow key={index}>
                                                <StyledTableCell >{voucher.cloudExam}</StyledTableCell>
                                                <StyledTableCell >{voucher.cloudPlatform}</StyledTableCell>
                                                <StyledTableCell>{voucher.voucherCode ?? 'Pending'}</StyledTableCell>
                                                <StyledTableCell >{voucher.voucherIssueLocalDate ? voucher.voucherIssueLocalDate : 'Pending'}</StyledTableCell>
                                                <StyledTableCell >{voucher.voucherExpiryLocalDate ? voucher.voucherExpiryLocalDate : 'Pending'}</StyledTableCell>
                                                <StyledTableCell >
                                                    {voucher.plannedExamDate}
                                                    <IconButton onClick={() => handleEditExamDate(index)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </StyledTableCell>
                                                <StyledTableCell className="table-cell">
                                                    {/* ... (continued in the next comment block) */}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>

                            {/* Table pagination */}
                            <TablePagination style={{ width: "70%", marginLeft: "2%" }}
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: data.length }]}
                                component="div"
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                labelRowsPerPage="Rows per page"
                            />
                        </TableContainer>
                    </Box>
                </div>

                {/* Edit Exam Date modal */}
                <Dialog open={isEditDateModalOpen} onClose={handleCancelEditDate}>
                    <DialogTitle>Edit Exam Date</DialogTitle>
                    <DialogContent sx={{ width: '300px', height: '300px' }}>
                        {/* Date picker for selecting a new exam date */}
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="yyyy-MM-dd"
                            utcOffset={0}
                            minDate={new Date()}
                        />
                    </DialogContent>
                    <DialogActions>
                        {/* Save and cancel buttons for the edit exam date modal */}
                        <Button onClick={handleSaveExamDate}>Save</Button>
                        <Button onClick={handleCancelEditDate}>Cancel</Button>
                    </DialogActions>
                </Dialog>

                {/* Error notification */}
                {error && (
                    <Snackbar
                        open={!!error}
                        autoHideDuration={6000}
                        onClose={() => setError(null)}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        style={{ bottom: '80px' }}
                    >
                        <MuiAlert
                            onClose={() => setError(null)}
                            severity="error"
                            sx={{ width: '100%', maxWidth: '100%' }}
                            style={{ backgroundColor: 'red', color: 'white', fontSize: '20px', padding: '20px' }}
                        >
                            {error}
                        </MuiAlert>
                    </Snackbar>
                )}
            </div>
        </>
    );
};

export default ViewVouchers;
