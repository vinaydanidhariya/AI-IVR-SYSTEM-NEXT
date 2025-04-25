// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'

// ** Auth HOC
import withAuth from 'src/utils/withAuth'

// Enhanced styled component for grid items
const StyledGridItem = styled(Grid)(({ theme }) => ({
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '& > div': {
    height: '100%',
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
    transition: 'box-shadow 0.3s ease',
    '&:hover': {
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)'
    }
  }
}))

const Dashboard = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <ApexChartWrapper>
      <Grid container spacing={isMobile ? 3 : 6}>
        <StyledGridItem item xs={12} md={4}>
          <Trophy />
        </StyledGridItem>
        <StyledGridItem item xs={12} md={8}>
          <StatisticsCard />
        </StyledGridItem>
        <StyledGridItem item xs={12} md={6} lg={4}>
          <WeeklyOverview />
        </StyledGridItem>
        <StyledGridItem item xs={12} md={6} lg={4}>
          <TotalEarning />
        </StyledGridItem>
        <StyledGridItem item xs={12} md={6} lg={4}>
          <Grid container spacing={isMobile ? 2 : 6}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='$25.6k'
                icon={<Poll />}
                color='success'
                trendNumber='+42%'
                title='Total Profit'
                subtitle='Weekly Profit'
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='$78'
                title='Refunds'
                trend='negative'
                color='secondary'
                trendNumber='-15%'
                subtitle='Past Month'
                icon={<CurrencyUsd />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='862'
                trend='negative'
                trendNumber='-18%'
                title='New Project'
                subtitle='Yearly Project'
                icon={<BriefcaseVariantOutline />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='15'
                color='warning'
                trend='negative'
                trendNumber='-18%'
                subtitle='Last Week'
                title='Sales Queries'
                icon={<HelpCircleOutline />}
              />
            </Grid>
          </Grid>
        </StyledGridItem>
        <StyledGridItem item xs={12} md={6} lg={4}>
          <SalesByCountries />
        </StyledGridItem>
        <StyledGridItem item xs={12} md={12} lg={8}>
          <DepositWithdraw />
        </StyledGridItem>
        <StyledGridItem item xs={12}>
          <Table />
        </StyledGridItem>
      </Grid>
    </ApexChartWrapper>
  )
}

export default withAuth(Dashboard)
