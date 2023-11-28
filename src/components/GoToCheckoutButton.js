import React from 'react'
import { AlertTooltip } from '@abdulrhmangoni/am-store-library'
import { ExitToApp, Payment } from '@mui/icons-material'
import { Button, Tooltip } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useSpeedMessage } from '@/hooks/useSpeedMessage';

export default function GoToCheckoutButton() {

    const { push } = useRouter();
    const shoppingCart = useSelector(state => state.shoppingCart);
    const { message } = useSpeedMessage();
    const userData = useSelector(state => state.userData);

    function IfTheCartValidToCheckout() {
        if (!shoppingCart.every(pro => pro.amount)) {
            message("there is item in your cart out of stock", "error", 10000);
            return false;
        }
        else if (!shoppingCart.every(pro => pro.count <= pro.amount)) {
            message("there is item in your cart its amount decremented", "error", 10000);
            return false;
        } else return true;
    }

    function goToCheckoutPage() {
        userData && shoppingCart.length && IfTheCartValidToCheckout() && push("/checkout");
    }

    const tooltipMsg = (unsignedMsg, unverifiedMsg) => {
        return !userData ? unsignedMsg : userData.hisEmailVerified ? undefined : unverifiedMsg;
    }

    return (
        <AlertTooltip
            title={tooltipMsg("You have to sign up first", "You have to verify your email for continue")}
            tooltipProps={{ disableHoverListener: userData?.hisEmailVerified }}
            type='warning'
            action={() => {
                !userData ? push("/sign-up")
                    : userData.hisEmailVerified ? undefined
                        : push("/email-verification");
            }}
            actionIcon={
                <Tooltip title={tooltipMsg("Go to sign up page", "Go to email verification page")}>
                    <ExitToApp color='warning' />
                </Tooltip>
            }
        >
            <span style={{ display: "flex" }}>
                <Button
                    onClick={goToCheckoutPage}
                    disabled={!userData?.hisEmailVerified}
                    variant='contained'
                    sx={{ mt: 1, width: "100%" }}
                    startIcon={<Payment />}
                    size="large"
                >
                    Checkout
                </Button>
            </span>
        </AlertTooltip>
    )
}
